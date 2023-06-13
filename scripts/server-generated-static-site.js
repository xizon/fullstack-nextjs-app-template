const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 12345;

app.use('/', express.static('out'));

// use it before all route definitions
app.use(cors({ origin: '*' }));


app.get('*', (req, res) => {

    let pagePath = req.path;

    if (! /\.html$/.test(req.url)) {

        // forward all requests to `/*/` to `/*.index.html`
        if (/\/$/.test(req.url)) {
            pagePath = `${pagePath.replace(/^\/|\/$/g, '')}.html`;
        }

        // forward all requests to `/*` to `/*.index.html`
        if (/[^\/]$/.test(req.url)) {
            pagePath = `${pagePath}.html`;
        }
    }

    res.sendFile(path.join(__dirname, `../out/${pagePath}`));

});

app.listen(port, () => console.log('\x1b[36m%s\x1b[0m', `--> Access http://localhost:${port} in the web browser`) );
