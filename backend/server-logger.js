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

    process.on('message', (message) => {
        const { log_type,url } = message.data;
        if (typeof log_type !== 'undefined') {
            const url = `${url}?log_type=${log_type}`;
            require("openurl").open(url);
        }
    });

    */

    try {
        const {log_type,url} = req.query;

        const child = fork(path.resolve(__dirname, '../logger.js'));
        child.on('message', (message) => {
            console.log(message);
        });
        child.send({
            "data": {log_type,url},
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
