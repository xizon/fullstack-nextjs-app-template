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
    return _date.toISOString().split('T')[0]+_date.toISOString().split('T')[1];   // 2023-08-1808_29_48.261Z
}


/**
 * A simplified format based on ISO 8601
 */
const simpleDate = () => {
    const _date = new Date();
    return _date.toISOString();  //  "2011-10-05T14:48:00.000Z"
}


module.exports = {
    dataIsString,
    base64StrToBuffer,
    uint8arrayToBuffer,
    fileDate,
    simpleDate
}     
