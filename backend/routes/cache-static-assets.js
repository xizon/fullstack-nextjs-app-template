const express = require('express');
const router = express.Router();
const path = require('path');

const { fileCache } = require('../plugins/cache'); 


// match `/plugins/xxxxx/1.0.0/static/js/main.js?xxxxxx`
router.get(/\/plugins\/[\w\W]*\/[\w\W]*\/static\/js\/(.*?)\.js$/, async (req, res) => {

    try {

        const pagePath = req.path;   // /plugins/xxx/yyy/
        const filePath = path.join(__dirname, `../uploads/${pagePath}`);


        // set cache
        let cacheName = '';
        const _cacheName = filePath.match(/(?<=plugins\/)(.*)(?=\/static)/);
        if (_cacheName !== null) {
            cacheName = `raw-script-${_cacheName[0].replace('/', '@')}__static`;
        }

        if (cacheName !== '') {

            const getFileContent = fileCache(filePath, cacheName);

            if ( getFileContent === null ) {
                // handle miss
                res.sendFile(filePath);
            } else {
                res.set({ 'content-type': 'application/javascript; charset=utf-8' });
                res.send(getFileContent);
            }
        } else {
            res.sendFile(filePath);
        }


    } catch (err) {
        res.status(500).send({
            "message": err.toString(),
            "code": 500
        });
    }


});

module.exports = router;