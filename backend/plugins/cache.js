const fs = require('fs');
const path = require('path');
const glob = require('glob');

const NodeCache = require('node-cache'); 
const pageStaticAssetsCache = new NodeCache(); // seconds
const md5 = require('md5');


const fileCache = (file) => {
    const key = md5(file);
    let res = null;

    const getFileContent = pageStaticAssetsCache.get(key);  // <Buffer 2f 2a 21 20 46 ...>
    if ( typeof getFileContent === 'undefined') {
        // handle miss
        const fileContent = fs.readFileSync(file); // If the second parameter is set to 'utf8'. it will be turned into a string instead of <Buffer 2f 2a 21 20 46 ...>
        pageStaticAssetsCache.set(key, fileContent, 600 ); //seconds
    } else {
        res = `/* Cache */` + getFileContent;
    }

    return res;
};

const deleteAllCache = () => {
    const keys = pageStaticAssetsCache.keys();
    pageStaticAssetsCache.del(keys);

    return keys;
};




module.exports = {
    fileCache,
    deleteAllCache
};
