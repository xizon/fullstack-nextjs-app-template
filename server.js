const { parse } = require('url');
const next = require('next');
const path = require('path');
const express = require('express')

let dev = process.env.NODE_ENV !== 'production'; // if "production", need run `npm run build` first
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();


app.prepare().then(() => {


    /**
     * ----------------------------------------------------------------
     * Using express()
     * ----------------------------------------------------------------
     */
    const server = express();

    /*
    server.use("/graphql", async (req, res, next) => {
        try {
            const { accessToken } = await getAccessToken(req, res, { refresh: true });

            if (accessToken) {
                req.headers["Authorization"] = accessToken;
            }
        } catch (err) {
            res.json({ errors: [{ code: err.code, message: err.message }] });
        }
        next();
    });
    */

    // Static resources in plugins can be used dynamically (no need to redeploy)
    // you can visit the static URL like this: http://localhost:3000/vars/custom-page/
    // !!! If using docker, http://localhost:3000/vars may not be accessible
    server.use("/vars", express.static(__dirname + "/plugins"));
  
    server.all('*', async (req, res) => {
  
        try {


            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true)
            const { pathname, query } = parsedUrl;


            // extract URL path
            // by limiting the path to current directory only
            const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
            let fileDirectory = path.join(__dirname, sanitizePath);


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
                await app.render(req, res, '/a', query);
            } else if (pathname === '/b') {
                await app.render(req, res, '/b', query);
            } else {
                await handle(req, res, parsedUrl);
            }

            
        } catch (err) {
            console.error('Error occurred handling', req.url, err)
            res.statusCode = 500
            res.end('internal server error')
        }

    });

    
    server.listen(port, (err) => {
      if (err) throw err
      console.log(`> Ready on http://${hostname}:${port}`)
    });


    /*
    !!!!Note: 
    If you use a "Docker container", please use the WebSocket service on port 5001 (check out `backend/server-socket.js`). 
    Using port 3000 will not work. You can’t run multiple services on the same port.

    ===========================
    Method 1
    ===========================
    // socket.io
    const httpServer = require('http').createServer(app);
    const io = require('socket.io')(httpServer, {
        cors: {
            origin: '*'
        }
    });

    io.on('connection', (socket) => {
        socket.on('chat message', msg => {
            io.emit('chat message', msg);
        });
    });

    // Stop running node in docker with Ctrl+C sends the SIGINT signal.
    // Usage: docker run --init -p <host_port>:<container_port<image_name:version>
    const process = require('process');
    process.on('SIGINT', () => {
        console.info("Interrupted")
        process.exit(0);
    });

    
    httpServer.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://${hostname}:${port}`)
    });

    ===========================
    Method 2
    ===========================
    // create `pages/api/socket.ts:`
  
    import { Server } from 'socket.io';

    export default function handler(req, res) {
        if (res.socket.server.io) {
            console.log("Already set up");
            res.end();
            return;
        }

        const io = new Server(res.socket.server);
        res.socket.server.io = io;

        io.on('connection', (socket) => {
            socket.on('BRIDGE_ALERT', msg => {
                io.emit('BRIDGE_ALERT', msg);
            });
        });

        console.log("Setting up socket");
        res.end();
    }
    */

})




/**
 * ----------------------------------------------------------------
 * Supprt HTTPS (Using https.createServer())
 * ----------------------------------------------------------------
 */
/*

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


