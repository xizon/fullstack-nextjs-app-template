const express = require('express');
const cors = require('cors');
const path = require('path');

const port = 8001;
const app = express();

//add other middleware
// HTTP request logger middleware for node.js
app.use(cors());


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

*/
 const getBackupNames = () => {
    return glob.sync(path.resolve(__dirname, '../backup/*')).map(item => item.split('/').at(-1));
};

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
                    fs.copyFileSync(oldpackPath, newpackPath);
                        

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
