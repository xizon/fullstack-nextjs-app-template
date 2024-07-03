const fs = require('fs');

const NodeCache = require('node-cache'); 
const pageStaticAssetsCache = new NodeCache(); // seconds
const md5 = require('md5');

const expire = 86400 * 180; //seconds (24 hours * 180)

const millisecondToTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    return {
        days: days,
        hours: hours
    };
}

const expireTime = (key) => {
    const _data = millisecondToTime(pageStaticAssetsCache.getTtl(key) - Date.now());
    return `${_data.days} days and ${_data.hours} hours`;
}


const fileCache = (file, dynamicSymbol) => {
    if (!fs.existsSync(file)) return null;

    const key = md5(dynamicSymbol);
    let res = null;

    const getFileContent = pageStaticAssetsCache.get(key);  // <Buffer 2f 2a 21 20 46 ...>
    if ( typeof getFileContent === 'undefined') {
        // handle miss
        const fileContent = fs.readFileSync(file); // If the second parameter is set to 'utf8'. it will be turned into a string instead of <Buffer 2f 2a 21 20 46 ...>
        pageStaticAssetsCache.set(key, fileContent, expire ); 
    } else {
        res = `/*-------- Cache Hash ${key}  (expire: ${expireTime(key)} ) -------*/` + getFileContent;
    }

    return res;
};



const setStringCache = (dynamicSymbol, content) => {
    const key = md5(dynamicSymbol);
    pageStaticAssetsCache.set(key, content, expire ); 
    return content;
};

const getStringCache = (dynamicSymbol) => {

    const key = md5(dynamicSymbol);
    const getFileContent = pageStaticAssetsCache.get(key);  // <Buffer 2f 2a 21 20 46 ...>
    if ( typeof getFileContent === 'undefined') {
        return null;
    } else {
        return `/*-------- Cache Hash ${key}  (expire: ${expireTime(key)} ) -------*/` + getFileContent;
    }  
};



const deleteAllCache = () => {
    const keys = pageStaticAssetsCache.keys();
    pageStaticAssetsCache.del(keys);
    console.log('--> delete all cache');

    return keys;
};

const deleteSpecCache = (dynamicSymbolArr) => {
    
    const res = Array.isArray(dynamicSymbolArr) ? dynamicSymbolArr : [dynamicSymbolArr];
    res.forEach((dynamicSymbol) => {
        const key = md5(dynamicSymbol);
        pageStaticAssetsCache.del(key);
        console.log('--> delete cache: ', dynamicSymbol);
    })
    

    return res;
};


module.exports = {
    fileCache,
    setStringCache,
    getStringCache,
    deleteAllCache,
    deleteSpecCache
};
