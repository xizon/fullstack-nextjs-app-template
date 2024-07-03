const express = require('express');
const cors = require('cors');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const compression = require('compression');


const { 
    LANG,
    PORT, 
    STATIC_FILES_DIR
} = require('./core/files/constants');



const port = PORT;
const app = express();


// enable compression middleware
// you could see "Content-Encoding: gzip" from "Response Headers"
app.use(compression());

//add other middleware
// HTTP request logger middleware for node.js
app.use(cors());


// api
app.use('/api', express.static(STATIC_FILES_DIR));
// app.use('/api', express.static(path.join(__dirname, '..', '/uploads/api')));


// utilities
const remainingElements = require('./utils/remaining-elements');



/*
 ================================================
  SERVICE: Merge and Manage all `api/*.js`
 ================================================
 */
/** Usage:

axios({
    method: 'post',
    url: 'http://localhost:7001/delete-merge-api-files',
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
    return glob.sync(path.resolve(__dirname, `../${STATIC_FILES_DIR}/*.js`)).map(item => item.split('/').at(-1));
};


app.post('/upload-merge-api', async (req, res) => {

    try {

        // Get all the API files
        const allApiFilePath = path.resolve(__dirname, `../${STATIC_FILES_DIR}/index/all.js`);
        const allApiFiles = glob.sync(path.resolve(__dirname, `../${STATIC_FILES_DIR}/*.js`));

        mergeApiFiles(allApiFiles, allApiFilePath);


        //
        res.set('Cache-Control', 'max-age=300');  // 5 minutes
        res.send({
            "data": { "mergeInfo": LANG.en.sendOk, "newData": getApiFileNames() },
            "message": LANG.en.sendOk,
            "code": 200
        });
    } catch (err) {
        res.status(500).send({
            "message": err.toString(),
            "code": 500
        });
    }
});


app.post('/get-merge-api-files', async (req, res) => {

    try {

        //
        res.send({
            "data": { files: getApiFileNames() },
            "message": LANG.en.sendOk,
            "code": 200
        });
    } catch (err) {
        res.status(500).send({
            "message": err.toString(),
            "code": 500
        });
    }
});

app.post('/delete-merge-api-files', async (req, res) => {

    const inputFiles = req.body.files;

    try {


        if (!inputFiles || inputFiles.length === 0) {
            res.send({
                "message": LANG.en.noFile,
                "code": 1000
            });
        } else {

            const oldFileNames = getApiFileNames();

            // Get all the API files
            const allApiFilePath = path.resolve(__dirname, `../${STATIC_FILES_DIR}/index/all.js`);
            const allApiFiles = glob.sync(path.resolve(__dirname, `../${STATIC_FILES_DIR}/*.js`));

            if (allApiFiles.length > 0) {

                allApiFiles.forEach((file) => {

                    const _file = file.split('/').at(-1);

                    inputFiles.forEach(name => {
                        if (_file === name) {

                            // DO NOT use `rmSync()`, There will be a request end 500 error caused by incomplete processing of the file
                            fs.rm(file, { recursive: true }, (err) => {
                                if (err) return console.log(err);
                                console.log(`\x1b[36m ${LANG.en.delete} \x1b[0m`, `${STATIC_FILES_DIR}/${file}`);
                            });


                        }
                    });

                });

            }

            setTimeout(() => {
                const latestAllApiFiles = glob.sync( path.resolve(__dirname, `../${STATIC_FILES_DIR}/*.js`) );
                mergeApiFiles(latestAllApiFiles, allApiFilePath);
            }, 500);

            const newFileNames = remainingElements(oldFileNames, inputFiles);

            //
            res.set('Cache-Control', 'max-age=300');  // 5 minutes
            res.send({
                "data": { "deleteInfo": LANG.en.sendOk, "newData": newFileNames },
                "message": LANG.en.sendOk,
                "code": 200
            });

        }


    } catch (err) {
        res.status(500).send({
            "message": err.toString(),
            "code": 500
        });
    }
});


/*
================================================
 START APP
================================================
*/
require('./plugins/signal');
const server = app.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(LANG.en.serverRun, host, port);
});
