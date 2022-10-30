const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

let dev = process.env.NODE_ENV !== 'production';
dev = false;  // need run `npm run build` first
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();




app.prepare().then(() => {
    createServer(async (req, res) => {
        try {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true)
            const { pathname, query } = parsedUrl

            // Get current router
            // such as: `/`, `/path1/path2`
            const curRoute = req.headers.referer !== undefined ? req.headers.referer.split( req.headers.host )[1] : '';
       
            // Generate statistics data
            if (curRoute === '/') {
                // Node server-side events
                // ...
            }



            // All requested resources
            if (pathname === '/a') {
                await app.render(req, res, '/a', query)
            } else if (pathname === '/b') {
                await app.render(req, res, '/b', query)
            } else {
                await handle(req, res, parsedUrl)
            }

        } catch (err) {
            console.error('Error occurred handling', req.url, err)
            res.statusCode = 500
            res.end('internal server error')
        }
    }).listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://${hostname}:${port}`)
    })
})




/*

// Supprt HTTPS
const fs = require('fs');
const path = require('path');
const https = require('https');
const cert = fs.readFileSync(path.join(__dirname,'../../path/bundle.crt'));
const key = fs.readFileSync(path.join(__dirname,'../../path/ca.key'));
const options = {key: key, cert: cert };


app.prepare().then(() => {
    https.createServer(options, async (req, res) => {
        try {
            ...
        } catch (err) {
            console.error('Error occurred handling', req.url, err)
            res.statusCode = 500
            res.end('internal server error')
        }
    }).listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on https://${hostname}:${port}`)
    })
})
*/


