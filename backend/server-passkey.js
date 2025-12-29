const express = require('express');
const cors = require('cors');
const { 
    LANG,
    PORT, 
    HOST_NAME,
} = require('./core/passkey/constants');


const port = PORT;
const app = express();



//add other middleware
// HTTP request logger middleware for node.js
app.use(cors());

app.use('/key-verify', require('./routes/passkey/key-verify'));
app.use('/get-keys', require('./routes/passkey/get-keys'));
app.use('/set-keys', require('./routes/passkey/set-keys'));



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

