/*

 !!! Warning: 
 
 Multiple micro-service containers cannot be opened on the server side at the same time, 
 otherwise the upstream server will terminate the WebSocket connection.

*/

const express = require('express');
const cors = require('cors');

//
const port = 5001;
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});


app.use(cors());

// Static resources in plugins can be used dynamically (no need to redeploy)
// you can visit the static URL like this: http://localhost:5001/my/custom-page/
app.use('/my', express.static('plugins'));

app.get('/plugins/*', async (req, res) => {
    let pagePath = req.path;   // /plugins/xxx/yyy/
    res.sendFile(path.join(__dirname, `../${pagePath}`));
});


io.on('connection', (socket) => {
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});


//
const hostname = 'localhost';
http.listen(port, () =>
    console.log(`> Server on http://${hostname}:${port}`)
);


/*
Usage for client:

<script id="socket.io" src="https://cdn.socket.io/4.6.1/socket.io.min.js"></script>
or
import { io } from "socket.io-client";

const socket = io('ws://localhost:5001');
document.getElementById('button').addEventListener('click', function (e) {
    e.preventDefault();
    socket.emit('chat message', 'test string');
});

socket.on('chat message', function (msg) {
    console.log(msg);
});

*/