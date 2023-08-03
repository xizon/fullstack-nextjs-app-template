const express = require('express');
const cors = require('cors');
const path = require('path');

const port = 6001;
const app = express();

//add other middleware
// HTTP request logger middleware for node.js
app.use(cors());


/*
 ================================================
  SERVICE: logger
 ================================================
 */
 app.get('/call/logger', async (req, res) => {

    /* logger.js

    const util = require('util');
    const exec = util.promisify(require('child_process').exec);
    async function run(file,filepath,arg) {
        try {
            const _filepath = `${filepath}${file}`;

            const { stdout, stderr } = await exec(_filepath);
            console.log('stdout:', stdout);
            console.log('stderr:', stderr);
        } catch (error) {
            console.error(error);
        };
    };


    process.on('message', (message) => {
        console.log("message: ", message);  // { data: {...}, message: 'OK', code: 200 }
    
        const { file,filepath,arg } = message.data;
        
        if (typeof file !== 'undefined') {
            run(file,filepath,arg);
            //require("openurl").open(url);
        }
    });

    */


    try {
        const {file,filepath,arg} = req.query;

        const child = fork(path.resolve(__dirname, '../call/logger.js'));
        child.on('message', (message) => {
            console.log(message);
        });
        child.send({
            "data": {file,filepath,arg},
            "message": "OK",
            "code": 200
        });

        res.send({
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
