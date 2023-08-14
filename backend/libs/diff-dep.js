/**
 * Compare the dependencies of the CORE PROGRAM and the independent installation package
 */
const objIsEmpty = require('./obj-detection');

function compareJSON(obj1, obj2) {
    const ret = {};
    for (let i in obj2) {
        if (!obj1.hasOwnProperty(i) || obj2[i] !== obj1[i]) {
            ret[i] = obj2[i];
        }
    }
    return objIsEmpty(ret) ? false : ret;
}

module.exports = compareJSON;