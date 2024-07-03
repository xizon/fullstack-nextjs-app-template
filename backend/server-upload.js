const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const sizeOf = require('image-size');
const compression = require('compression');


const { 
    LANG,
    PORT, 
    HOST_NAME,
    STATIC_FILES_DIR,
    REQUEST_MAX_LIMIT,
    UPLOAD_MAX_SIZE
} = require('./core/upload/constants');

const {
    imgIncludeExtTypes
} = require('./core/upload/match');

const {
    binaryToBase64Str
} = require('./core/upload/helpers');

const {
    getPaletteData
} = require('./plugins/parse-image');




const port = PORT;
const app = express();


// enable compression middleware
// you could see "Content-Encoding: gzip" from "Response Headers"
app.use(compression());

// enable files upload
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: UPLOAD_MAX_SIZE //max file(s) size
    },
}));

//add other middleware
// HTTP request logger middleware for node.js
app.use(cors());

// parsing the incoming data
app.use(bodyParser.json({ limit: REQUEST_MAX_LIMIT })); // "limit" is to avoid request errors: PayloadTooLargeError: request entity too large
app.use(bodyParser.urlencoded({ extended: true, limit: REQUEST_MAX_LIMIT }));


// app.use(express.json({ limit: REQUEST_MAX_LIMIT }));
// app.use(express.urlencoded({ extended: true, limit: REQUEST_MAX_LIMIT }));


// HTTP request logger middleware for node.js
app.use(morgan('dev'));


// create cache for static assets
// !!! CODE NEEDS TO BE PLACED HERE （BEFORE `app.use('/xxxx', express.static(xxxx))`） !!!
app.use(require('./routes/cache-static-assets'));
app.use('/cache-delete-static-assets', require('./routes/cache-delete-static-assets'));
app.use('/cache-delete-static-assets-spec', require('./routes/cache-delete-static-assets-spec'));


// Note: `app.use(..., express.static(...))` cannot be placed before `app.use(cors())`

// Static resources in plugins can be used dynamically (no need to redeploy)
// you can visit the static URL like this: http://localhost:4001/vars/custom-page/
app.use('/vars', express.static(STATIC_FILES_DIR));
// app.use('/vars', express.static(path.join(__dirname, '..', '/uploads/vars')));



/*
 ================================================
  SERVICE 1: upload .zip file
 ================================================
 */


app.post('/upload-plugin', async (req, res) => {

    try {
        if (!req.files) {
            res.send({
                status: false,
                message: LANG.en.noFile
            });
        } else {


            const currentFilesData = req.files.clientFiles;
            const filesName = [];
            const mvFun = (f) => {

                filesName.push(f.name);
                res.filepath = filesName;
                
                // Use the mv() method to place the file in upload directory (i.e. "'./uploads/'")
                // Note: res.send() cannot be written and reused in the function, and multiple files will report an error
                const uploadPath = path.join(__dirname, '..', `/${STATIC_FILES_DIR}/`, f.name);
                f.mv(uploadPath, function (err) {
                    if (err) {
                        res.send(err);
                    }
                });

                // Or use a synchronous method to write to <Buffer....>
                //fs.writeFileSync(uploadPath, f.data);

                
            };

            if (currentFilesData instanceof Array) {
                // for multiple files
                for (let i = 0; i < currentFilesData.length; i++) {
                    mvFun(currentFilesData[i]);
                }
            } else {
                // for single file
                mvFun(currentFilesData);
            }


            // Other asynchronous operations
            //const myPromise = await muFunc();
            
            res.send({
                status: true,
                message: `${filesName}${LANG.en.uploadedRes}`
            });


        }
    } catch (err) {
        res.status(500).send({
            "message": err.toString(),
            "code": 500
        });
    }
});



/*
 ================================================
  SERVICE 2: parase image
 ================================================
 */
 app.post('/upload-image', async (req, res) => {

    const { symbol, md5Enabled } = req.query;

    try {
        if (!req.files) {
            res.send({
                "message": LANG.en.noFile,
                "code": 1000
            });
        } else {
            
            // Use the mv() method to place the file in upload directory (i.e. "'./uploads/'")
            // Note: if `mv()` uses a callback, ` res.send()` should be written in the callback function

            const currentFilesData = req.files.clientFiles;

            // for single file
            const f = currentFilesData;
            if ( imgIncludeExtTypes.test(f.name) ) {

                const ext = /^.+\.([^.]+)$/.exec(f.name);
                let saveName = typeof symbol === 'undefined' ? f.name : `${typeof md5Enabled !== 'undefined' ? symbol + '-' + md5(symbol) : symbol}.${ext == null ? '' : ext[1]}`;

                const tempPath = path.join(__dirname, '..', `/${STATIC_FILES_DIR}/_temp/`);
                const uploadPath = path.join(__dirname, '..', `/${STATIC_FILES_DIR}/_temp/`, saveName);
                if (!fs.existsSync(tempPath)){
                    fs.mkdirSync(tempPath, { recursive: true });
                }
                
                // move file
                fs.writeFileSync(uploadPath, f.data);

                // parse image
                const imgPath = `http://${HOST_NAME}:${PORT}/${STATIC_FILES_DIR}/_temp/${saveName}`;
                const paletteDataPromise = await getPaletteData(imgPath); // Promise
            
                
                // delete unnecessary files and folders
                fs.rmSync(tempPath, { recursive: true });
                console.log(`\x1b[36m ${LANG.en.delete} \x1b[0m`, `${STATIC_FILES_DIR}/_temp/`);

                //console.log(f.data); // <Buffer 89 50 4e 47 0d 0a 1a 0a  />

                
                // get image dimensions
                const { height, width } = sizeOf(uploadPath);
                
                
                //
                res.send({
                    "data": { "uploadedInfo": {
                        imgName: saveName,
                        paletteData: paletteDataPromise,
                        imgData: `data:${f.mimetype};base64, ${binaryToBase64Str(f.data)}`,
                        imgPath: imgPath,
                        dimensions: {
                            height, 
                            width
                        },
                        ext: `${ext == null ? '' : ext[1]}`
                    } },
                    "message": LANG.en.sendOk,
                    "code": 200
                });      

            }  

                
        }
    } catch (err) {
        res.status(500).send({
            "message": err.toString(),
            "code": 500
        });
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



/** How to:

---------------
HTML
---------------
<form onsubmit="fun()">
  <input class="uploadinput" type="file" id="upload-files" name="files" multiple>
  <label for="upload-files">Select files:</label>
  <input type="submit">
</form>


.uploadinput[type="file"] {
    border: 1px solid #333;
    display: none;
}

.uploadinput[type="file"]+label {
    padding: 5px;
    border-radius: 2px;
    font-size: 14px;
    cursor: pointer;
    background-color: rgb(54, 54, 54);
    color: #fff;
    border: 1px solid #333;
}

---------------
JS
---------------
const fileInput = document.getElementById('upload-files');
const curFiles = fileInput.files;
const formData = new FormData();
formData.append('action', 'upload_plug_action');

for (let i = 0; i < curFiles.length; i++) {
    formData.append("clientFiles", curFiles[i]);
}

axios.post('http://localhost:4001/upload-plugin', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
}).then(function (response) {
    const jsonData = response.data;
    console.log(jsonData);


}).catch(function (error) {
    if (error.response) {
        console.log(error.response.status);
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log(error.message);
    }
});
*/