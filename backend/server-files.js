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
// app.use('/api', express.static(path.join(__dirname, '..', '/uploads/api')));


// utilities
const remainingElements = require('./libs/remaining-elements');



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

        const oldFileNames = getApiFileNames();

        // Get all the API files
        const allApiFilePath = path.resolve(__dirname, '../api/index/all.js');
        const allApiFiles = glob.sync(path.resolve(__dirname, '../api/*.js'));

        if (allApiFiles.length > 0) {

            allApiFiles.forEach((file) => {

                const _file = file.split('/').at(-1);

                inputFiles.forEach(name => {
                    if (_file === name) {

                        // DO NOT use `rmSync()`, There will be a request end 500 error caused by incomplete processing of the file
                        fs.rm(file, { recursive: true }, (err) => {
                            if (err) return console.log(err);
                            console.log('\x1b[36m%s\x1b[0m', `--> Deleted "api/${file}" successfully`);
                        });


                    }
                });

            });

        }

        const latestAllApiFiles = glob.sync(path.resolve(__dirname, '../api/*.js'));
        mergeApiFiles(latestAllApiFiles, allApiFilePath);

        const newFileNames = remainingElements(oldFileNames, inputFiles);

        //
        res.send({
            "data": { "deleteInfo": 'OK', "newData": newFileNames },
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
