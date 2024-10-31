/**
 * Core Utilities
 * 
 * Usage:
 * 
 
const windowScrollUpdate = CoreUtils.return('throttle', handleScrollEvent, 5);
CoreUtils.call('delCookie', 'DATA_NAME', '/')

 */
import CoreUtils from './UtilsHook';
import { 
    debounce, 
    throttle 
} from './libs/performance';
import { 
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
} from './libs/easing';
import { 
    getCookie, 
    setCookie, 
    delCookie 
} from './libs/cookies-tool';
import { browser } from './libs/browser';
import { os } from './libs/os';
import apiRemoteToLocal from './libs/api-remote-to-local';
import { matchAllFilesUrls } from './libs/match-string';
import { renameFile } from './libs/rename';
import { multipleClasses } from './libs/multiple-inheritance';
import { getClassesMethods } from './libs/get-classes-methods';
import { serializeArray } from './libs/formdata';
import { 
    getFilesFromHead, 
    getBodyCode 
} from './libs/parse-htmlstr';
import { loadTextures } from './libs/loader';
import { 
    getNextSiblings, 
    getPreviousSiblings, 
    getAllSiblings, 
    getParents, 
    getChildren,
    isRootElement,
    getDocument,
    isNode,
    isElement,
    isHTMLElement,
    isShadowRoot,
    nodeContains
} from './libs/dom';
import { 
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
} from './libs/format-string';
import { 
    getTransitionDuration, 
    getAbsoluteCoordinates, 
    getOffset, 
    getPosition,
    getAbsolutePositionOfStage
} from './libs/get-element-property';
import { 
    isJSON,
    isEmpty,
    isNumber,
    isInt,
    isEmail,
    isTel,
    isMobile
} from './libs/validate';
import { quickSort } from './libs/sort';
import strToNumId from './libs/string-to-numid';
import {
    htmlEncode,
    htmlDecode
} from './libs/sanitize';
import toSlug from './libs/to-slug';
import {
    RGBToHSL,
    HSLToRGB,
    generateGradient
} from './libs/color';

import shuffle from './libs/shuffle';
import {
    getAllDepth,
    convertTree,
    flatTree,
    addTreeDepth,
    addTreeIndent
} from './libs/tree';

import {
    addScript,
    removeScript
} from './libs/use-script';
import {
    addStyle,
    removeStyle
} from './libs/use-style';

import {
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
} from './libs/buffer';

import {
    updateJsonNode
} from './libs/arr-manipulation';

import {
    evaluate,
    calcAdd,
    calcSub,
    calcMul,
    calcDiv,
    isDecimal,
    isNumeric,
    truncateDecimals,
    numZeroPad,
    exceedDecimalPlaces,
    formatNumber
} from './libs/math';
import guid from './libs/guid';


import {
    JWT_SECRET,
    JWT_EXPIRES_IN,
    sign as jwtSign,
    decode as jwtDecode,
    verify as  jwtVerify
} from './libs/jwt';

import {
    autop,
    reverseAutop
} from './libs/autop';


import {
    convertStringByCommaToValByBrackets,
    convertArrToValByBrackets,
    convertStringByCommaToValByBraces,
    convertArrToValByBraces
} from './libs/convert';


import {
    extractContentsOfBrackets,
    extractContentsOfBraces,
    extractContentsOfParentheses
} from './libs/extract';


import {
    isTimeString,
    getNow,
    padZero,
    dateFormat,
    getDateDetails,

    //
    isValidDate,
    isValidHours,
    isValidMinutesAndSeconds,
    isValidYear,
    isValidMonth,
    isValidDay,

    //
    getLastDayInMonth,
    getFirstAndLastMonthDay,
    getCalendarDate,
    getFullTime,

    // current
    getTodayDate,
    getCurrentMonth,
    getCurrentYear,
    getCurrentDay,
    getCurrentDate,

    // next & previous
    getTomorrowDate,
    getYesterdayDate,
    getNextMonthDate,
    getPrevMonthDate,
    getNextYearDate,
    getPrevYearDate,
    getSpecifiedDate,


    // convert
    setDateHours,
    setDateMinutes,
    setDateDays,
    timestampToDate,

    // get dates list
    getMonthDates,
    getWeekDatesFromSun,
    getWeekDatesFromMon
} from './libs/date';


import {
    getTimeslots,
    getMinutesBetweenDates,
    getMinutesBetweenTime,
    convertTimeToMin
} from './libs/time';

import {
    removeArrDuplicateItems,
    deepClone,
    flatData
} from './libs/object';

import {
    isInViewport
} from './libs/viewport';



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
CoreUtils.add('isRootElement', (...attrs) => isRootElement(...attrs));
CoreUtils.add('getDocument', (...attrs) => getDocument(...attrs));
CoreUtils.add('isNode', (...attrs) => isNode(...attrs));
CoreUtils.add('isElement', (...attrs) => isElement(...attrs));
CoreUtils.add('isHTMLElement', (...attrs) => isHTMLElement(...attrs));
CoreUtils.add('isShadowRoot', (...attrs) => isShadowRoot(...attrs));
CoreUtils.add('nodeContains', (...attrs) => nodeContains(...attrs));
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
CoreUtils.add('calcAdd', (...attrs) => calcAdd(...attrs));
CoreUtils.add('calcSub', (...attrs) => calcSub(...attrs));
CoreUtils.add('calcMul', (...attrs) => calcMul(...attrs));
CoreUtils.add('calcDiv', (...attrs) => calcDiv(...attrs));
CoreUtils.add('isDecimal', (...attrs) => isDecimal(...attrs));
CoreUtils.add('isNumeric', (...attrs) => isNumeric(...attrs));
CoreUtils.add('truncateDecimals', (...attrs) => truncateDecimals(...attrs));
CoreUtils.add('numZeroPad', (...attrs) => numZeroPad(...attrs));
CoreUtils.add('exceedDecimalPlaces', (...attrs) => exceedDecimalPlaces(...attrs));
CoreUtils.add('formatNumber', (...attrs) => formatNumber(...attrs));
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
CoreUtils.add('isValidDate', (...attrs) => isValidDate(...attrs));
CoreUtils.add('getLastDayInMonth', (...attrs) => getLastDayInMonth(...attrs));
CoreUtils.add('getFirstAndLastMonthDay', (...attrs) => getFirstAndLastMonthDay(...attrs));
CoreUtils.add('getCalendarDate', (...attrs) => getCalendarDate(...attrs));
CoreUtils.add('getTodayDate', (...attrs) => getTodayDate(...attrs));
CoreUtils.add('getCurrentMonth', (...attrs) => getCurrentMonth(...attrs));
CoreUtils.add('getCurrentYear', (...attrs) => getCurrentYear(...attrs));
CoreUtils.add('getCurrentDate', (...attrs) => getCurrentDate(...attrs));
CoreUtils.add('getFullTime', (...attrs) => getFullTime(...attrs));
CoreUtils.add('getTomorrowDate', (...attrs) => getTomorrowDate(...attrs));
CoreUtils.add('getYesterdayDate', (...attrs) => getYesterdayDate(...attrs));
CoreUtils.add('getNextMonthDate', (...attrs) => getNextMonthDate(...attrs));
CoreUtils.add('getPrevMonthDate', (...attrs) => getPrevMonthDate(...attrs));
CoreUtils.add('getNextYearDate', (...attrs) => getNextYearDate(...attrs));
CoreUtils.add('getPrevYearDate', (...attrs) => getPrevYearDate(...attrs));
CoreUtils.add('getSpecifiedDate', (...attrs) => getSpecifiedDate(...attrs));
CoreUtils.add('getTimeslots', (...attrs) => getTimeslots(...attrs));
CoreUtils.add('getMinutesBetweenDates', (...attrs) => getMinutesBetweenDates(...attrs));
CoreUtils.add('getMinutesBetweenTime', (...attrs) => getMinutesBetweenTime(...attrs));
CoreUtils.add('convertTimeToMin', (...attrs) => convertTimeToMin(...attrs));
CoreUtils.add('isTimeString', (...attrs) => isTimeString(...attrs));
CoreUtils.add('getNow', (...attrs) => getNow(...attrs));
CoreUtils.add('padZero', (...attrs) => padZero(...attrs));
CoreUtils.add('dateFormat', (...attrs) => dateFormat(...attrs));
CoreUtils.add('getDateDetails', (...attrs) => getDateDetails(...attrs));
CoreUtils.add('isValidHours', (...attrs) => isValidHours(...attrs));
CoreUtils.add('isValidMinutesAndSeconds', (...attrs) => isValidMinutesAndSeconds(...attrs));
CoreUtils.add('isValidYear', (...attrs) => isValidYear(...attrs));
CoreUtils.add('isValidMonth', (...attrs) => isValidMonth(...attrs));
CoreUtils.add('isValidDay', (...attrs) => isValidDay(...attrs));
CoreUtils.add('getCurrentDay', (...attrs) => getCurrentDay(...attrs));
CoreUtils.add('setDateHours', (...attrs) => setDateHours(...attrs));
CoreUtils.add('setDateMinutes', (...attrs) => setDateMinutes(...attrs));
CoreUtils.add('setDateDays', (...attrs) => setDateDays(...attrs));
CoreUtils.add('timestampToDate', (...attrs) => timestampToDate(...attrs));
CoreUtils.add('getMonthDates', (...attrs) => getMonthDates(...attrs));
CoreUtils.add('getWeekDatesFromSun', (...attrs) => getWeekDatesFromSun(...attrs));
CoreUtils.add('getWeekDatesFromMon', (...attrs) => getWeekDatesFromMon(...attrs));
CoreUtils.add('removeArrDuplicateItems', (...attrs) => removeArrDuplicateItems(...attrs));
CoreUtils.add('deepClone', (...attrs) => deepClone(...attrs));
CoreUtils.add('flatData', (...attrs) => flatData(...attrs));
CoreUtils.add('isInViewport', (...attrs) => isInViewport(...attrs));


export default CoreUtils;
