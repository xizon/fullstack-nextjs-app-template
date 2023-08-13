const express = require('express');
const cors = require('cors');
const path = require('path');

const port = 7001;
const app = express();

//add other middleware
// HTTP request logger middleware for node.js
app.use(cors());


// api
app.use('/api', express.static('api'));


/*
 ================================================
  SERVICE: Merge and Manage all `api/*.js`
 ================================================
 */
 const mergeApiFiles = (files, targatPath) => {

    if (files.length === 0) {
        fs.writeFileSync(targatPath, '/* No API Files! */');
    } else {
        let allContent = `
/*------------------------------------------------------------------
!!!!! GENERATED CODE -- DO NOT EDIT!
------------------------------------------------------------------*/
                    `;

        files.forEach((file) => {
            const fileContent = fs.readFileSync(file);
            allContent += `
/**
 * ////////////////////////////////////////
 * Name: ${file.split('/').at(-1)}
 * Update: ${new Date()}
 * ////////////////////////////////////////
 */
${fileContent}
        
                        `;

        });

        fs.writeFileSync(targatPath, allContent);   
    }

};

const getApiFileNames = () => {
    return glob.sync(path.resolve(__dirname, '../api/*.js')).map(item => item.split('/').at(-1));
};


app.post('/upload-merge-api', async (req, res) => {

    try {

        // Get all the API files
        const allApiFilePath = path.resolve(__dirname, '../api/index/all.js');
        const allApiFiles = glob.sync(path.resolve(__dirname, '../api/*.js'));

        mergeApiFiles(allApiFiles, allApiFilePath);

      
        //
        res.send({
            "data": { "mergeInfo": "OK", "newData": getApiFileNames() },
            "message": "OK",
            "code": 200
        });
    } catch (err) {
        res.status(500).send(err);
    }
});


app.post('/get-merge-api-files', async (req, res) => {

    try {

        //
        res.send({
            "data": { files: getApiFileNames() },
            "message": "OK",
            "code": 200
        });      
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post('/delete-merge-api-files', async (req, res) => {

    const inputFiles = req.body.files;

    try {

        // Get all the API files
        const allApiFilePath = path.resolve(__dirname, '../api/index/all.js');
        const allApiFiles = glob.sync( path.resolve(__dirname, '../api/*.js') );
        
        if ( allApiFiles.length > 0 ) {

            allApiFiles.forEach((file) => {
  
                inputFiles.forEach(name => {
                    if (file.indexOf(name) >= 0) {
                        fs.rmSync(file, { recursive: true });
                        console.log('\x1b[36m%s\x1b[0m', `--> Deleted "api/${file}" successfully`);
                    }
                });

            });

        }

        const latestAllApiFiles = glob.sync( path.resolve(__dirname, '../api/*.js') );
        mergeApiFiles(latestAllApiFiles, allApiFilePath);
            
        //
        res.send({
            "data": { "deleteInfo": 'OK', "newData": getApiFileNames() },
            "message": "OK",
            "code": 200
        });      
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
