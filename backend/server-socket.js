const express = require('express');
const cors = require('cors');

//
const port = 5001;
const app = express();

const http = require('http').Server(app, {
    cors: {
        origin: '*'
    }
});
const io = require('socket.io')(http);


app.use(cors());

// Static resources in plugins can be used dynamically (no need to redeploy)
// you can visit the static URL like this: http://localhost:5001/consts/custom-page/
app.use('/consts', express.static('plugins'));

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

const socket = io();
document.getElementById('button').addEventListener('click', function (e) {
    e.preventDefault();
    socket.emit('chat message', 'test string');
});

socket.on('chat message', function (msg) {
    console.log(msg);
});

*/