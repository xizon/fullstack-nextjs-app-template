const express = require('express');
const router = express.Router();
const { verifyToken } = require('../../core/auth/helpers');

const AppKeyModel = require('./comm/key-model');


// Add a binding to handle '/set-keys'
router.post('/',  async (req, res) => {

    const { token } = req.body;

    // invalid token
    const validToken = await verifyToken(token);
    if (validToken.code === 500) {
        res.status(401).send({
            "message": 'unauthorized',
            "code": 401
        });
        return;
    }

    const {
        keysData,
    } = req.body;

    try {

        const _data = JSON.parse(keysData);

        if (Array.isArray(_data)) {
            const count = AppKeyModel.syncAllKeys(_data);
        }

        res.send({
            "message": '',
            "code": 200
        });
        
    
    } catch (err) {
        res.status(500).send({
            "message": err.toString(),
            "code": 500
        });
    }

});

module.exports = router;


