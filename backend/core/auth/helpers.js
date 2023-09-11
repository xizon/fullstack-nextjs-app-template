const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');



const { 
    LANG,
    MS_KEY_FILE_NAME,
    ACCESS_TOKEN_SECRET
} = require('./constants');



// get secret key
const getSecret = async () => {
    let key = ACCESS_TOKEN_SECRET;
    const keyPath = path.join(__dirname, `../../${MS_KEY_FILE_NAME}`);
    if (fs.existsSync(keyPath)) {
        const data = await fs.promises.readFile(keyPath, "binary");
        key = Buffer.from(data);
    }

    return key;

};



// Generate secret key file
const generateKeyFile = (str) => {
    const keyPath = path.join(__dirname, `../../${MS_KEY_FILE_NAME}`);
    fs.writeFileSync(keyPath, str);
};


// verify token
const verifyToken = async (token) => {

    try {
        const secret = await getSecret();
        const authDecoded = jwt.verify(token.replace('Bearer ', ''), secret);

        return {
            "data": authDecoded,
            "message": LANG.en.sendOk,
            "code": 200
        }

    } catch (err) {
        return {
            "message": err.toString(),
            "code": 500
        };
    }

};



module.exports = {
    getSecret,
    generateKeyFile,
    verifyToken
}     
