const express = require('express');
const cors = require('cors');
const path = require('path');

const { 
    LANG,
    PORT
} = require('./core/logger/constants');


const port = PORT;
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

    try {
        const {file,filepath,arg} = req.query;

        const child = fork(path.resolve(__dirname, './call/logger.js'));
        child.on('message', (message) => {
            console.log(message);
        });
        child.send({
            "data": {file,filepath,arg},
            "message": LANG.en.sendOk,
            "code": 200
        });

        res.send({
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
