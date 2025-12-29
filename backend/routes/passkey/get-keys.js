const express = require('express');
const router = express.Router();

const AppKeyModel = require('./comm/key-model');

// Add a binding to handle '/get-keys'
router.get('/',  async (req, res) => {

    try {

        res.send({
            "data": {keysData: AppKeyModel.getAllKeys()},
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