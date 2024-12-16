const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { expressjwt: jwtVerify } = require('express-jwt');


const { 
    LANG,
    PORT,
    ALGORITHMS
} = require('./core/auth/constants');



const { 
    getSecret,
    verifyToken
} = require('./core/auth/helpers');



const port = PORT;
const app = express();

//add other middleware
// HTTP request logger middleware for node.js
app.use(cors());


// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/*
 ================================================
  Generate access token
 ================================================
 */
/*
Client:

axios({
    method: 'post',
    url: "/create-token",
    data: { name: 'admin',  role: '[ADMIN_SYS]' }
}) 
*/
app.post('/create-token', async (req, res) => {

    const {name, role} = req.body;

    // Generate an access token
    const secret = await getSecret();
    const accessToken = jwt.sign({ name: name,  role: role }, secret, { algorithm: ALGORITHMS[0] });

    res.send({
        "data": { token: accessToken },
        "message": LANG.en.sendOk,
        "code": 200
    });

});


/*
 ================================================
  Verify access token
 ================================================
 */
/*
Client:

axios({
    method: 'post',
    url: "/verify-token",
    headers: { 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiW0FETUlOX1NZU10iLCJpYXQiOjE2OTQxODg3MTJ9.ZRGUbpUq0jww2rZ2xdg1TuJZ3pR1iuP5fIO4m0fSddw' }
    
});
    
*/

//!!! IMPORTANT !!!
// If you use "https" to forward the service. Please do not use `express-jwt` for form upload.

app.post('/verify-token', jwtVerify({ secret: getSecret, algorithms: ALGORITHMS }), async (req, res) => {

    // console.log(req.auth); // { name: 'admin', role: '[ADMIN_SYS]', iat: 1694188712 }

 
    try {

        res.send({
            "data": { stats: getExistStats() },
            "message": LANG.en.sendOk,
            "code": 200
        });      
    } catch (err) {
        res.status(500).send({
            "message": err.toString(),
            "code": 500
        });
    }

});



// If you add Authorization to the header, 
// the [boundary] will be lost and the content of FormData cannot be obtained correctly.
// the headers are correctly set `Content-Type:multipart/form-data; boundary=----WebKitFormBoundaryxxxxxxxxxx`
app.post('/upload-plugin-security', async (req, res) => {

    const { Authorization } = req.query;
    const auth = await verifyToken(Authorization);
    if (auth.code === 500) {
        res.status(401).send({
            "message": LANG.en.unauthorized,
            "code": 401
        });
        return;
    }



    // do something
    // ...
});




/*
 ================================================
  Error handling (should be written at the end)
 ================================================
 */
 app.use( (err, req, res, next) => {
    if (err.name === "UnauthorizedError") {

        res.status(401).send({
            "message": LANG.en.unauthorized,
            "code": 401
        });
    } else {
        next(err);
    }
});



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
