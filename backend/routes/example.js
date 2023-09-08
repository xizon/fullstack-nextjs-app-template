const express = require('express');
const router = express.Router();

/*
Usage:

app.use('/xxxx-xxxx', require('./routes/example.js'));

*/

// Add a binding to handle '/xxxx-xxxxx'
router.post('/', async (req, res) => {

    try {

        // do something
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