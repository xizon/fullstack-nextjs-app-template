const express = require('express');
const router = express.Router();
const { deleteSpecCache } = require('../plugins/cache'); 

const { 
    LANG
} = require('../config/constants');


// Add a binding to handle '/cache-delete-static-assets-spec'
router.post('/', async (req, res) => {

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