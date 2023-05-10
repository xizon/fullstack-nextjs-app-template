const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = express();


// enable files upload
app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 10 * 1024 * 1024 * 1024 //10MB max file(s) size
    },
}));

//add other middleware
// HTTP request logger middleware for node.js
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));


//make uploads directory static
// Note: `app.use(..., express.static(...))` cannot be placed before `app.use(cors())`

// Static resources in plugins can be used dynamically (no need to redeploy)
// you can visit the static URL like this: http://localhost:4001/vars/custom-page/
app.use('/vars', express.static('plugins'));

const targetUploadPath = path.resolve(__dirname, '../plugins/');

// upoad single file
app.post('/upload-plugin', async (req, res) => {


    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {



            const currentFilesData = req.files.clientFiles;
            const filesName = [];
            const mvFun = (f) => {

                filesName.push(f.name);
                res.filepath = filesName;
                
                // Use the mv() method to place the file in upload directory (i.e. "'./uploads/'")
                // Note: res.send() cannot be written and reused in the function, and multiple files will report an error
                const uploadPath = path.join(__dirname, '..', '/plugins/', f.name);
                f.mv(uploadPath, function (err) {
                    if (err) {
                        res.send(err);
                    }
                })
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

            
            res.send({
                status: true,
                message: `${filesName} is uploaded`
            });


        }
    } catch (err) {
        res.status(500).send(err);
    }
});


// get page (It is also possible not to write the following code)
app.get('/plugins/*', async (req, res) => {
    let pagePath = req.path;   // /plugins/xxx/yyy/
    res.sendFile(path.join(__dirname, `../${pagePath}`));
});


//start app 
const hostname = 'localhost';
const port = 4001;

app.listen(port, () =>
    console.log(`> Server on http://${hostname}:${port}`)
);



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