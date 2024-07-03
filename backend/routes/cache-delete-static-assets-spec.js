const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');
const { ALGORITHMS } = require('../core/auth/constants');
const { getSecret } = require('../core/auth/helpers');

const { deleteSpecCache } = require('../plugins/cache'); 

const { 
    LANG
} = require('../config/constants');


// Add a binding to handle '/cache-delete-static-assets-spec'
router.post('/', jwt({ secret: getSecret, algorithms: ALGORITHMS }), async (req, res) => {

    const { cacheName } = req.body;

    try {
        deleteSpecCache(cacheName);

        //
        res.send({
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


module.exports = router;