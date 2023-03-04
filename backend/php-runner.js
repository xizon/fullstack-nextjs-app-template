const express = require('express');
const app = express();

// must specify options hash even if no options provided!
const phpExpress = require('php-express')({

    // assumes php is in your PATH
    binPath: 'php'
});

// set view engine to php-express
app.set('views', './public/server/');
app.engine('php', phpExpress.engine);
app.set('view engine', 'php');

// CORS on ExpressJS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/json");
    next();
});

// routing all .php file to php-express
app.all(/.+\.php$/, phpExpress.router);

const server = app.listen(4000, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('PHP server listening at http://%s:%s', host, port);
});
