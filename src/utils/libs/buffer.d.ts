/**
 * base64 to ArrayBuffer
 * @param {String} data
 * @returns {ArrayBuffer}
 */
export function base64ToArrayBuffer(data: string): ArrayBuffer;
/**
 * ArrayBuffer to Uint8Array
 * @param {ArrayBuffer} data
 * @returns {Uint8Array}
 */
export function arrayBufferToUint8Array(data: ArrayBuffer): Uint8Array;
/**
 * uint8array to array
 * @param {Uint8Array} data
 * @returns {Array}
 */
export function uint8arrayToArr(data: Uint8Array): any[];
/**
 * array to uint8array
 * @param {Array} data
 * @returns {Uint8Array}
 */
export function arrayToUint8array(data: any[]): Uint8Array;
/**
 * uint8array to base64 string
 * @param {Uint8Array|Array} data
 * @returns {String}
 */
export function uint8arrayToBase64Str(data: Uint8Array | any[]): string;
/**
 * decode base64 string
 * @param {String} data
 * @returns {String}
 */
export function decodeBase64Str(data: string): string;
/**
 * integer to binary
 * @param {Number} data
 * @returns {String}
 */
export function toBinary(data: number): string;
/**
 * array to blob
 * @param {Uint8Array} uint8ArrayData
 * @returns {Blob}
 */
export function arrayToBlob(uint8ArrayData: Uint8Array): Blob;
/**
 * blob to uint8array
 * @param {Blob} data
 * @returns {Uint8Array}
 */
export function blobToUint8array(data: Blob): Uint8Array;
/**
 * array to stream
 * @param {Array<Uint8Array>} data
 * @returns {ReadableStream }
 */
export function arrayToStream(data: Array<Uint8Array>): ReadableStream;
/**
 * read stream
 * @param {ReadableStream } data
 * @returns {Promise}
 */
export function readStream(data: ReadableStream): Promise<any>;
