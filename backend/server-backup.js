const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const glob = require('glob');
const mwsExtract = require('mws-extract-document');

// Unzip the compressed package to the specified directory (usually used independently for the installer)
const fs = require('fs');
const AdmZip = require("adm-zip");
const mime = require('mime');

const port = 8001;
const app = express();

//add other middleware
// HTTP request logger middleware for node.js
app.use(cors());

// "limit" is to avoid request errors: PayloadTooLargeError: request entity too large
app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '200mb' }));


// api
app.use('/backup', express.static('backup'));


// utilities
const remainingElements = require('./libs/remaining-elements');




/*
 ================================================
  SERVICE: Package backup system
 ================================================
 */
/** Usage:

axios({
    method: 'post',
    url: 'http://localhost:8001/delete-files-backup',
    data: {
        files: ['file1.ext','file2.ext']
    }
})
.then(function (response: any) {
    console.log('restore response: ', response);
    if (response.status === 200) {
        if (response.data.code === 1000) {
            console.log(response.data.message);
        } else {
            console.log('oparation successfully');
        }
    }
    
})
.catch(function (error: any) {
    console.log('restore error: ', error);
});



-------

// !!! Note: that "uint8ArrayData" is the stream response from the server, which is actually a "Uint8Array" object, not an "Array" object

const uint8ArrayData = [137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,30,0,0,0,30,8,6,0,0,0,59,48,174,162,0,0,0,220,73,68,65,84,72,199,237,214,81,14,194,32,12,0,80,60,128,215,219,49,28,91,118,10,55,216,53,188,132,137,39,19,71,130,75,69,42,148,194,76,116,31,253,89,40,111,233,104,153,48,198,136,111,132,216,225,255,134,143,151,166,84,28,150,152,151,24,158,207,182,130,45,106,92,12,91,193,16,93,241,218,112,8,181,113,174,9,163,232,90,234,130,223,50,134,142,47,135,11,36,216,183,57,49,81,29,67,125,120,116,11,238,12,60,9,133,240,228,45,180,120,91,11,133,112,31,72,176,184,100,162,19,150,3,75,157,139,147,209,208,225,234,136,184,202,65,177,118,146,200,102,178,20,250,169,143,49,188,43,129,198,6,136,116,101,246,55,191,33,168,162,116,65,108,114,97,56,11,77,29,153,109,4,87,57,195,38,117,86,95,75,162,20,56,84,114,205,153,233,148,219,9,226,154,123,131,81,175,69,201,41,239,27,188,255,222,254,52,252,0,234,253,186,89,222,225,73,252,0,0,0,0,73,69,78,68,174,66,96,130];

const arrData =  JSON.stringify(Array.from(uint8ArrayData));


axios({
    method: 'post',
    url: 'http://localhost:8001/download-files-backup',
    data: {
        targetfiles: [
            {name: 'demo.jpg', rawData: Array.from(uint8ArrayData)}
        ]
    }
})
.then(function (response) {
    console.log(response);

});

*/


const getBackupNames = () => {
    return glob.sync(path.resolve(__dirname, '../backup/*')).map(item => item.split('/').at(-1));
};

const getFileStats = () => {
    return getBackupNames().map((item) => {
        const _file = path.resolve(__dirname, `../backup/${item}`);

        const fileStats = fs.statSync(_file)
        const fileSizeInBytes = fileStats.size;
        // Convert the file size to megabytes (optional)
        const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
        const mimeType = mime.getType(_file);
     
        return {
            name: item,
            sizeMegabytes: fileSizeInBytes,
            sizeBytes: fileSizeInMegabytes,
            createTime: fileStats.ctime,
            mimeType: mimeType,
            port: port,
            path: 'backup/'
        }
    })
};

const getExistStats = () => {
    const jsonPath = path.resolve(__dirname, '../backup/archive.json');
    if (!fs.existsSync(jsonPath)) return [];

    const json = JSON.parse(fs.readFileSync(jsonPath));
    return json;
};


const generateArchiveFile = () => {
    // generate the catelog archive
    const archivePath = path.resolve(__dirname, `../backup/archive.json`);
    fs.writeFileSync(archivePath, JSON.stringify(getFileStats()));
};




app.post('/download-files-backup', async (req, res) => {

    const inputFiles = req.body.targetfiles;

    try {

        if (!inputFiles || inputFiles.length === 0) {
            res.send({
                "message": "No file selected",
                "code": 1000
            });
        } else {

            inputFiles.forEach(item => {
              
                const ext = path.extname(item.name);
                const output = path.resolve(__dirname, `../backup/${item.name}`);
                let buffer = Buffer.from(Uint8Array.from(item.rawData));  // for "Uint8Array()"
  
                if (Object.prototype.toString.call(item.rawData) === '[object String]') {
                    if ( /(json|xml|text)$/i.test(ext) ) {
                        fs.writeFile(output, item.rawData, (err) => {
                            if (err) return console.log(err);
                            console.log('\x1b[36m%s\x1b[0m', `--> Downloaded "${item.name}" completed`);
                        });

                    } else if ( /(jpg|jpeg|png|svg|gif|webp)$/i.test(ext) ) {
                        buffer = item.rawData.replace(/^data:image\/\w+;base64,/, "");
                        buffer = Buffer.from(buffer, 'base64');

                        fs.writeFile(output, buffer, (err) => {
                            if (err) return console.log(err);
                            console.log('\x1b[36m%s\x1b[0m', `--> Downloaded "${item.name}" completed`);
                        });

                    } else {

                        mwsExtract(item.rawData, output)
                            .then((msg) => {
                                console.log('\x1b[36m%s\x1b[0m', `--> Downloaded "${item.name}" completed`);
                            })
                            .catch((err) => {
                            console.log(err)
                        });

                    }
                } else {
                    fs.writeFile(output, buffer, (err) => {
                        if (err) return console.log(err);
                        console.log('\x1b[36m%s\x1b[0m', `--> Downloaded "${item.name}" completed`);
                    });
                }
                


                "binary"
            });

            //
            res.send({
                "message": "OK",
                "code": 200
            });     

        }

 
    } catch (err) {
        res.status(500).send(err);
    }
});


app.post('/get-files-backup', async (req, res) => {

    try {

        //
        res.send({
            "data": { files: getBackupNames() },
            "message": "OK",
            "code": 200
        });      
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/get-files-stats', async (req, res) => {

    try {

        //
        res.send({
            "data": { stats: getExistStats() },
            "message": "OK",
            "code": 200
        });      
    } catch (err) {
        res.status(500).send(err);
    }
});


app.post('/delete-files-backup', async (req, res) => {

    const inputFiles = req.body.files;

    try {


        if (!inputFiles || inputFiles.length === 0) {
            res.send({
                "message": "No file selected",
                "code": 1000
            });
        } else {
            const oldFileNames = getBackupNames();

            // Get all the API files
            const allPlugins = glob.sync( path.resolve(__dirname, '../backup/*') );
            
            if ( allPlugins.length > 0 ) {

                allPlugins.forEach((file) => {
    
                    const _file = file.split('/').at(-1);

                    inputFiles.forEach(name => {
                        if (_file === name) {


                            // DO NOT use `rmSync()`, There will be a request end 500 error caused by incomplete processing of the file
                            fs.rm( file, { recursive: true }, (err) => {
                                if (err) return console.log(err);
                                console.log('\x1b[36m%s\x1b[0m', `--> Deleted "backup/${file}" successfully`);
                            });
                            
                        }
                    });

                });

            }

            const newFileNames = remainingElements(oldFileNames, inputFiles);

            // generate the catelog archive
            setTimeout(() => {
                generateArchiveFile();
            }, 500);
            


            //
            res.send({
                "data": { "deleteInfo": 'OK', "newData": newFileNames },
                "message": "OK",
                "code": 200
            });      

        }  


    } catch (err) {
        res.status(500).send(err);
    }
});


app.post('/backupfiles-compression', async (req, res) => {

    try {

        const zip = new AdmZip();
        const _date = new Date();
        const createDate = _date.toISOString().split('T')[0]+_date.toISOString().split('T')[1];

        const currPath = path.resolve(__dirname, '../uploads/');
        const outputFile = path.resolve(__dirname, `../backup/uploads-backup-${createDate}.zip`);

        //
        zip.addLocalFolder(currPath);
        zip.writeZip(outputFile);


        // copy the latest file
        const newpackPath = path.resolve(__dirname, `../backup/uploads-backup-latest.zip`);
        fs.copyFileSync(outputFile, newpackPath);



        // generate the catelog archive
        setTimeout(() => {
            generateArchiveFile();
        }, 500);


        //
        res.send({
            "data": { files: getBackupNames(), archive: 'archive.json'  },
            "message": "OK",
            "code": 200
        });      
    } catch (err) {
        res.status(500).send(err);
    }
});



app.post('/backupfiles-restore', async (req, res) => {

    const restorefile = req.body.restorefile;

    try {

        if (!restorefile || restorefile === '') {
            res.send({
                "message": "No file selected",
                "code": 1000
            });
        } else {
            const _date = new Date();
            const currentDate = _date.toISOString();

            // delete
            const oldUploadsFolder = path.resolve(__dirname, '../uploads/');
            fs.rm( oldUploadsFolder, { recursive: true }, (err) => {
                if (err) return console.log(err);
                console.log('\x1b[36m%s\x1b[0m', `--> Deleted "uploads/" successfully`);

                if (!fs.existsSync(oldUploadsFolder)){
                    fs.mkdirSync(oldUploadsFolder, { recursive: true });

                    // move the backup file
                    const oldpackPath = path.resolve(__dirname, `../backup/${restorefile}`);
                    const newpackPath = path.resolve(__dirname, `../uploads/${restorefile}`);
                    
                    if (fs.existsSync(oldpackPath)) {
                        fs.copyFileSync(oldpackPath, newpackPath);

                        // !!! Prevent decompression errors from causing service crashes
                        try {
                            // Unzip file
                            const zip = new AdmZip(newpackPath);
                            const targetPath = path.resolve(__dirname, `../uploads/`);

                            zip.extractAllTo(targetPath, /*overwrite*/ true);
                            console.log('\x1b[36m%s\x1b[0m', `--> (Step 4)  Extracted "uploads/${restorefile}" to "uploads/*" successfully`);


                            // delete the backup file
                            fs.rm( newpackPath, { recursive: true }, (err) => {
                                if (err) return console.log(err);
                                console.log('\x1b[36m%s\x1b[0m', `--> Deleted "uploads/${newpackPath}" successfully`);
                            });
                                            
                        } catch (err) {}

                    }


                } 

            });




            //
            res.send({
                "data": { restoreFile: restorefile, restoreTime: currentDate },
                "message": "OK",
                "code": 200
            });   

        }
            
   
    } catch (err) {
        res.status(500).send(err);
    }
});




/*
================================================
 START APP
================================================
*/
const hostname = 'localhost';

app.listen(port, () =>
    console.log(`> Server on http://${hostname}:${port}`)
);
