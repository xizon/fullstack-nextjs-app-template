const path = require('path');
const glob = require('glob');
const fs = require('fs');
const mime = require('mime');

const { 
    PORT
} = require('./constants');


const { 
    STATIC_FILES_DIR,
    ARCHIVE_FILE_NAME
} = require('./constants');

const { 
    bytesConvertToMegabytes 
} = require('./computeds');




/**
 * Determine whether it is String
 */
const dataIsString = (data) => {
    return Object.prototype.toString.call(data) === '[object String]';
};

/**
 * base64 string to buffer
 */
const base64StrToBuffer = (data) => (
    Buffer.from(data, 'base64')
);


/**
 * uint8array to buffer
 */
const uint8arrayToBuffer = (data) => (
    Buffer.from(Uint8Array.from(data))
);

/**
 * File date format
 */
const fileDate = () => {
    const _date = new Date();
    return _date.toISOString().split('T')[0]+_date.toISOString().split('T')[1].replace(/\/|\:/g, '_');   // 2023-08-1808_29_48.261Z
}



/**
 * A simplified format based on ISO 8601
 */
const simpleDate = () => {
    const _date = new Date();
    return _date.toISOString();  //  "2011-10-05T14:48:00.000Z"
}





const getBackupNames = () => {
    return glob.sync(path.resolve(__dirname, `../../${STATIC_FILES_DIR}/*`)).map(item => item.split('/').at(-1));
};

const getFileStats = () => {
    return getBackupNames().map((item) => {
        const _file = path.resolve(__dirname, `../../${STATIC_FILES_DIR}/${item}`);

        const fileStats = fs.statSync(_file)
        const fileSizeInBytes = fileStats.size;
        // Convert the file size to megabytes (optional)
        const fileSizeInMegabytes = bytesConvertToMegabytes(fileSizeInBytes);
        const mimeType = mime.getType(_file);
     
        return {
            name: item,
            sizeMegabytes: fileSizeInBytes,
            sizeBytes: fileSizeInMegabytes,
            createTime: fileStats.ctime,
            lastModified: fileStats.mtime,
            mimeType: mimeType,
            port: PORT,
            path: `${STATIC_FILES_DIR}/`
        }
    })
};

const getExistStats = () => {
    const jsonPath = path.resolve(__dirname, `../../${STATIC_FILES_DIR}/${ARCHIVE_FILE_NAME}`);
    if (!fs.existsSync(jsonPath)) return [];

    const json = JSON.parse(fs.readFileSync(jsonPath));
    return json;
};


const generateArchiveFile = () => {
    // generate the catelog archive
    const archivePath = path.resolve(__dirname, `../../${STATIC_FILES_DIR}/${ARCHIVE_FILE_NAME}`);
    fs.writeFileSync(archivePath, JSON.stringify(getFileStats()));
};




module.exports = {
    dataIsString,
    base64StrToBuffer,
    uint8arrayToBuffer,
    fileDate,
    simpleDate,
    getBackupNames,
    getFileStats,
    getExistStats,
    generateArchiveFile
}     
