/*

 !!! Common Load-balancing Solutions: 


1. [Socket.io issue with multiple Kubernetes pods]

Solution 1:

Using k8s with load balancing, without nginx. Config the sessionAffinity on service:

```yml
service.spec.sessionAffinity = "ClientIP"
```


Solution 2:

Adding transports: ['websocket'] to socketIOClient options in our multi-pod Kubernetes environment:

```yml
socketIOClient(someUrl, {transports: ['websocket']});
```


2. [Other platforms]

Refer to: https://socket.io/docs/v4/using-multiple-nodes/

*/

const express = require('express');
const cors = require('cors');

const { 
    LANG,
    PORT
} = require('./core/socket/constants');


//
const port = PORT;
const app = express();

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});


app.use(cors());


io.on('connection', (socket) => {
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});



// Stop running node in docker with Ctrl+C sends the SIGINT signal.
// Usage: docker run --init -p <host_port>:<container_port<image_name:version>
const process = require('process');
process.on('SIGINT', () => {
    console.info(LANG.en.interrupted)
    process.exit(0);
});




//
const server = http.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(LANG.en.serverRun, host, port);
});




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