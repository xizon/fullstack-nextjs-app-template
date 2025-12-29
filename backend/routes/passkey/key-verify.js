const express = require('express');
const router = express.Router();

const AppKeyModel = require('./comm/key-model');


/**
 * Used for `@pages/api/passkey.ts`
 */
// Add a binding to handle '/key-verify'
router.post('/', async (req, res) => {

    const {key} = req.body;

    const isValid = AppKeyModel.verifyKeyExists(key);

    if (!isValid) {
        res.status(401).send({
            "valid": false,
            "message": 'unauthorized',
            "code": 401
        });
        return;
    }

    if (isValid) {
        res.send({
            "valid": true,
            "message": '',
            "code": 200
        });
    }



});

module.exports = router;