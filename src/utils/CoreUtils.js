/**
 * Core Utilities
 * 
 * Usage:
 * 
 
const windowScrollUpdate = CoreUtils.return('throttle', handleScrollEvent, 5);
CoreUtils.call('delCookie', 'DATA_NAME', '/')

 */
const CoreUtils = require('./UtilsHook');
const { 
    debounce, 
    throttle 
} = require('./libs/performance');
const { 
    easeLinear, 
    easeInQuad, 
    easeOutQuad, 
    easeInOutQuad, 
    easeInSine, 
    easeOutSine, 
    easeInOutSine, 
    easeInExpo, 
    easeOutExpo, 
    easeInOutExpo, 
    easeInCirc, 
    easeOutCirc, 
    easeInOutCirc, 
    easeInCubic, 
    easeOutCubic, 
    easeInOutCubic, 
    easeInQuart, 
    easeOutQuart, 
    easeInOutQuart, 
    easeInQuint, 
    easeOutQuint, 
    easeInOutQuint, 
    easeInElastic, 
    easeOutElastic, 
    easeInOutElastic, 
    easeInBack, 
    easeOutBack, 
    easeInOutBack
} = require('./libs/easing');
const { 
    getCookie, 
    setCookie, 
    delCookie 
} = require('./libs/cookies-tool');
const { browser } = require('./libs/browser');
const { os } = require('./libs/os');
const apiRemoteToLocal = require('./libs/api-remote-to-local');
const { matchAllFilesUrls } = require('./libs/match-string');
const { renameFile } = require('./libs/rename');
const { multipleClasses } = require('./libs/multiple-inheritance');
const { getClassesMethods } = require('./libs/get-classes-methods');
const { serializeArray } = require('./libs/formdata');
const { 
    getFilesFromHead, 
    getBodyCode 
} = require('./libs/parse-htmlstr');
const { loadTextures } = require('./libs/loader');
const { 
    getNextSiblings, 
    getPreviousSiblings, 
    getAllSiblings, 
    getParents, 
    getChildren 
} = require('./libs/dom');
const { 
    rmSpec, 
    onlyNumAndLetter, 
    rmAllSpace, 
    trimAll, 
    multiSpacesToSingle,
    htmlToPlain,
    stripTagsAndContent,
    removeFirstLastSlash,
    removeTrailingSlash,
    removeFirstSlash
} = require('./libs/format-string');
const { 
    getTransitionDuration, 
    getAbsoluteCoordinates, 
    getOffset, 
    getPosition,
    getAbsolutePositionOfStage
} = require('./libs/get-element-property');
const { 
    isJSON,
    isEmpty,
    isNumber,
    isInt,
    isEmail,
    isTel,
    isMobile
} = require('./libs/validate');
const { quickSort } = require('./libs/sort');
const strToNumId = require('./libs/string-to-numid');
const {
    htmlEncode,
    htmlDecode
} = require('./libs/sanitize');
const toSlug = require('./libs/to-slug');
const {
    RGBToHSL,
    HSLToRGB,
    generateGradient
} = require('./libs/color');

const shuffle = require('./libs/shuffle');
const {
    getAllDepth,
    convertTree,
    flatTree,
    addTreeDepth,
    addTreeIndent
} = require('./libs/tree');

const {
    addScript,
    removeScript
} = require('./libs/use-script');
const {
    addStyle,
    removeStyle
} = require('./libs/use-style');

const {
    base64ToArrayBuffer,
    arrayBufferToUint8Array,
    uint8arrayToArr,
    arrayToUint8array,
    uint8arrayToBase64Str,
    decodeBase64Str,
    toBinary,
    arrayToBlob,
    blobToUint8array,
    arrayToStream,
    readStream    
} = require('./libs/buffer');

const {
    updateJsonNode
} = require('./libs/arr-manipulation');

const {
    evaluate
} = require('./libs/math');
const guid = require('./libs/guid');


const {
    JWT_SECRET,
    JWT_EXPIRES_IN,
    sign: jwtSign,
    decode: jwtDecode,
    verify: jwtVerify
} = require('./libs/jwt');

const {
    autop,
    reverseAutop
} = require('./libs/autop');


const {
    convertStringByCommaToValByBrackets,
    convertArrToValByBrackets,
    convertStringByCommaToValByBraces,
    convertArrToValByBraces
} = require('./libs/convert');


const {
    extractContentsOfBrackets,
    extractContentsOfBraces,
    extractContentsOfParentheses
} = require('./libs/extract');


// use these methods
CoreUtils.add('debounce', (...attrs) => debounce(...attrs));
CoreUtils.add('throttle', (...attrs) => throttle(...attrs));
CoreUtils.add('easeLinear', (...attrs) => easeLinear(...attrs));
CoreUtils.add('easeInQuad', (...attrs) => easeInQuad(...attrs));
CoreUtils.add('easeOutQuad', (...attrs) => easeOutQuad(...attrs));
CoreUtils.add('easeInOutQuad', (...attrs) => easeInOutQuad(...attrs));
CoreUtils.add('easeInSine', (...attrs) => easeInSine(...attrs));
CoreUtils.add('easeInSine', (...attrs) => easeInSine(...attrs));
CoreUtils.add('easeOutSine', (...attrs) => easeOutSine(...attrs));
CoreUtils.add('easeInOutSine', (...attrs) => easeInOutSine(...attrs));
CoreUtils.add('easeInExpo', (...attrs) => easeInExpo(...attrs));
CoreUtils.add('easeOutExpo', (...attrs) => easeOutExpo(...attrs));
CoreUtils.add('easeInOutExpo', (...attrs) => easeInOutExpo(...attrs));
CoreUtils.add('easeInCirc', (...attrs) => easeInCirc(...attrs));
CoreUtils.add('easeOutCirc', (...attrs) => easeOutCirc(...attrs));
CoreUtils.add('easeOutCirc', (...attrs) => easeOutCirc(...attrs));
CoreUtils.add('easeInOutCirc', (...attrs) => easeInOutCirc(...attrs));
CoreUtils.add('easeInCubic', (...attrs) => easeInCubic(...attrs));
CoreUtils.add('easeOutCubic', (...attrs) => easeOutCubic(...attrs));
CoreUtils.add('easeInOutCubic', (...attrs) => easeInOutCubic(...attrs));
CoreUtils.add('easeInQuart', (...attrs) => easeInQuart(...attrs));
CoreUtils.add('easeOutQuart', (...attrs) => easeOutQuart(...attrs));
CoreUtils.add('easeInOutQuart', (...attrs) => easeInOutQuart(...attrs));
CoreUtils.add('easeInQuint', (...attrs) => easeInQuint(...attrs));
CoreUtils.add('easeOutQuint', (...attrs) => easeOutQuint(...attrs));
CoreUtils.add('easeInOutQuint', (...attrs) => easeInOutQuint(...attrs));
CoreUtils.add('easeInElastic', (...attrs) => easeInElastic(...attrs));
CoreUtils.add('easeOutElastic', (...attrs) => easeOutElastic(...attrs));
CoreUtils.add('easeInOutElastic', (...attrs) => easeInOutElastic(...attrs));
CoreUtils.add('easeInBack', (...attrs) => easeInBack(...attrs));
CoreUtils.add('easeOutBack', (...attrs) => easeOutBack(...attrs));
CoreUtils.add('easeInOutBack', (...attrs) => easeInOutBack(...attrs));
CoreUtils.add('getCookie', (...attrs) => getCookie(...attrs));
CoreUtils.add('setCookie', (...attrs) => setCookie(...attrs));
CoreUtils.add('delCookie', (...attrs) => delCookie(...attrs));
CoreUtils.add('browser', () => browser);
CoreUtils.add('os', () => os);
CoreUtils.add('matchAllFilesUrls', (...attrs) => matchAllFilesUrls(...attrs));
CoreUtils.add('renameFile', (...attrs) => renameFile(...attrs));
CoreUtils.add('apiRemoteToLocal', (...attrs) => apiRemoteToLocal(...attrs));
CoreUtils.add('multipleClasses', (...attrs) => multipleClasses(...attrs));
CoreUtils.add('getClassesMethods', (...attrs) => getClassesMethods(...attrs));
CoreUtils.add('serializeArray', (...attrs) => serializeArray(...attrs));
CoreUtils.add('getFilesFromHead', (...attrs) => getFilesFromHead(...attrs));
CoreUtils.add('getBodyCode', (...attrs) => getBodyCode(...attrs));
CoreUtils.add('loadTextures', (...attrs) => loadTextures(...attrs));
CoreUtils.add('getNextSiblings', (...attrs) => getNextSiblings(...attrs));
CoreUtils.add('getPreviousSiblings', (...attrs) => getPreviousSiblings(...attrs));
CoreUtils.add('getAllSiblings', (...attrs) => getAllSiblings(...attrs));
CoreUtils.add('getParents', (...attrs) => getParents(...attrs));
CoreUtils.add('getChildren', (...attrs) => getChildren(...attrs));
CoreUtils.add('rmSpec', (...attrs) => rmSpec(...attrs));
CoreUtils.add('onlyNumAndLetter', (...attrs) => onlyNumAndLetter(...attrs));
CoreUtils.add('rmAllSpace', (...attrs) => rmAllSpace(...attrs));
CoreUtils.add('trimAll', (...attrs) => trimAll(...attrs));
CoreUtils.add('multiSpacesToSingle', (...attrs) => multiSpacesToSingle(...attrs));
CoreUtils.add('htmlToPlain', (...attrs) => htmlToPlain(...attrs));
CoreUtils.add('stripTagsAndContent', (...attrs) => stripTagsAndContent(...attrs));
CoreUtils.add('removeFirstLastSlash', (...attrs) => removeFirstLastSlash(...attrs));
CoreUtils.add('removeTrailingSlash', (...attrs) => removeTrailingSlash(...attrs));
CoreUtils.add('removeFirstSlash', (...attrs) => removeFirstSlash(...attrs));
CoreUtils.add('getTransitionDuration', (...attrs) => getTransitionDuration(...attrs));
CoreUtils.add('getAbsoluteCoordinates', (...attrs) => getAbsoluteCoordinates(...attrs));
CoreUtils.add('getOffset', (...attrs) => getOffset(...attrs));
CoreUtils.add('getPosition', (...attrs) => getPosition(...attrs));
CoreUtils.add('getAbsolutePositionOfStage', (...attrs) => getAbsolutePositionOfStage(...attrs));
CoreUtils.add('isJSON', (...attrs) => isJSON(...attrs));
CoreUtils.add('isEmpty', (...attrs) => isEmpty(...attrs));
CoreUtils.add('isNumber', (...attrs) => isNumber(...attrs));
CoreUtils.add('isInt', (...attrs) => isInt(...attrs));
CoreUtils.add('isEmail', (...attrs) => isEmail(...attrs));
CoreUtils.add('isTel', (...attrs) => isTel(...attrs));
CoreUtils.add('isMobile', (...attrs) => isMobile(...attrs));
CoreUtils.add('quickSort', (...attrs) => quickSort(...attrs));
CoreUtils.add('strToNumId', (...attrs) => strToNumId(...attrs));
CoreUtils.add('htmlEncode', (...attrs) => htmlEncode(...attrs));
CoreUtils.add('htmlDecode', (...attrs) => htmlDecode(...attrs));
CoreUtils.add('toSlug', (...attrs) => toSlug(...attrs));
CoreUtils.add('RGBToHSL', (...attrs) => RGBToHSL(...attrs));
CoreUtils.add('HSLToRGB', (...attrs) => HSLToRGB(...attrs));
CoreUtils.add('generateGradient', (...attrs) => generateGradient(...attrs));
CoreUtils.add('shuffle', (...attrs) => shuffle(...attrs));
CoreUtils.add('getAllDepth', (...attrs) => getAllDepth(...attrs));
CoreUtils.add('convertTree', (...attrs) => convertTree(...attrs));
CoreUtils.add('flatTree', (...attrs) => flatTree(...attrs));
CoreUtils.add('addTreeDepth', (...attrs) => addTreeDepth(...attrs));
CoreUtils.add('addTreeIndent', (...attrs) => addTreeIndent(...attrs));
CoreUtils.add('addScript', (...attrs) => addScript(...attrs));
CoreUtils.add('removeScript', (...attrs) => removeScript(...attrs));
CoreUtils.add('addStyle', (...attrs) => addStyle(...attrs));
CoreUtils.add('removeStyle', (...attrs) => removeStyle(...attrs));
CoreUtils.add('base64ToArrayBuffer', (...attrs) => base64ToArrayBuffer(...attrs));
CoreUtils.add('arrayBufferToUint8Array', (...attrs) => arrayBufferToUint8Array(...attrs));
CoreUtils.add('uint8arrayToArr', (...attrs) => uint8arrayToArr(...attrs));
CoreUtils.add('arrayToUint8array', (...attrs) => arrayToUint8array(...attrs));
CoreUtils.add('uint8arrayToBase64Str', (...attrs) => uint8arrayToBase64Str(...attrs));
CoreUtils.add('decodeBase64Str', (...attrs) => decodeBase64Str(...attrs));
CoreUtils.add('toBinary', (...attrs) => toBinary(...attrs));
CoreUtils.add('arrayToBlob', (...attrs) => arrayToBlob(...attrs));
CoreUtils.add('blobToUint8array', (...attrs) => blobToUint8array(...attrs));
CoreUtils.add('arrayToStream', (...attrs) => arrayToStream(...attrs));
CoreUtils.add('readStream', (...attrs) => readStream(...attrs));
CoreUtils.add('updateJsonNode', (...attrs) => updateJsonNode(...attrs));
CoreUtils.add('evaluate', (...attrs) => evaluate(...attrs));
CoreUtils.add('guid', (...attrs) => guid(...attrs));
CoreUtils.add('JWT_SECRET', () => JWT_SECRET);
CoreUtils.add('JWT_EXPIRES_IN', () => JWT_EXPIRES_IN);
CoreUtils.add('jwtSign', (...attrs) => jwtSign(...attrs));
CoreUtils.add('jwtDecode', (...attrs) => jwtDecode(...attrs));
CoreUtils.add('jwtVerify', (...attrs) => jwtVerify(...attrs));
CoreUtils.add('autop', (...attrs) => autop(...attrs));
CoreUtils.add('reverseAutop', (...attrs) => reverseAutop(...attrs));
CoreUtils.add('convertStringByCommaToValByBrackets', (...attrs) => convertStringByCommaToValByBrackets(...attrs));
CoreUtils.add('convertArrToValByBrackets', (...attrs) => convertArrToValByBrackets(...attrs));
CoreUtils.add('convertStringByCommaToValByBraces', (...attrs) => convertStringByCommaToValByBraces(...attrs));
CoreUtils.add('convertArrToValByBraces', (...attrs) => convertArrToValByBraces(...attrs));
CoreUtils.add('extractContentsOfBrackets', (...attrs) => extractContentsOfBrackets(...attrs));
CoreUtils.add('extractContentsOfBraces', (...attrs) => extractContentsOfBraces(...attrs));
CoreUtils.add('extractContentsOfParentheses', (...attrs) => extractContentsOfParentheses(...attrs));


// node & browser
module.exports = CoreUtils;
