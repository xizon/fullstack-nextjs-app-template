const express = require('express');
const { 
    LANG,
    PORT, 
    TEMPLATE_FILES_PATH
} = require('./core/php/constants');

const { 
    matchPhpFile
} = require('./core/php/match');



const port = PORT;
const app = express();


// must specify options hash even if no options provided!
const phpExpress = require('php-express')({

    // assumes php is in your PATH
    binPath: 'php'
});

// set view engine to php-express
app.set('views', TEMPLATE_FILES_PATH);
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
app.all(matchPhpFile, phpExpress.router);


require('./plugins/signal');
const server = app.listen(port, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(LANG.en.serverRun, host, port);
});
