const express = require('express');
const router = express.Router();

const { deleteAllCache } = require('../plugins/cache'); 


// Add a binding to handle '/cache-delete-static-assets'
router.post('/', async (req, res) => {

    try {
        deleteAllCache();

        //
        res.send({
            "message": '',
            "code": 200
        });      
    } catch (err) {
        res.status(500).send(err);
    }

});


module.exports = router;