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
    maxHttpBufferSize: 10 * 1024 * 1024,  // maxPayload is "10M"
    cors: {
        origin: '*'
    }
});


app.use(cors());

// do something with express


io.on('connection', (socket) => {
    require('./plugins/ws').main(socket, io);
});


//
require('./plugins/signal');
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