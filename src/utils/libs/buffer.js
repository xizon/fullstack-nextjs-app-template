


/**
 * base64 to ArrayBuffer
 * @param {String} data 
 * @returns {ArrayBuffer}
 */
/*
@returns:

ArrayBuffer(522240)

    byteLength: 522240
    detached: false
    maxByteLength: 522240
    resizable: false
    [[Prototype]]: ArrayBuffer
    [[Int8Array]]: Int8Array(522240)
    [[Uint8Array]]: Uint8Array(522240)
    [[Int16Array]]: Int16Array(261120)
    [[Int32Array]]: Int32Array(130560)
    [[ArrayBufferByteLength]]: 522240
    [[ArrayBufferData]]: 673
*/
function base64ToArrayBuffer(data) {

    let res = data;
    if (data.indexOf('base64,') >= 0) {
        res = data.split('base64,')[1];
    }

    //
    const binaryString = atob(res);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

/**
 * ArrayBuffer to Uint8Array
 * @param {ArrayBuffer} data 
 * @returns {Uint8Array}
 */
/*
@returns:

Uint8Array(522240) [208, 207, 17, 224, 161, 177, 26, 225, 0, 0, ......]
*/
function arrayBufferToUint8Array(data) {
    const bytes = new Uint8Array(data);
    return bytes;
}


/**
 * uint8array to array
 * @param {Uint8Array} data 
 * @returns {Array}
 */
function uint8arrayToArr(data) {
    return Array.from(data);
}


/**
 * array to uint8array
 * @param {Array} data 
 * @returns {Uint8Array}
 */
/* Example:

axios({
    method: 'get',
    url: 'http://xxxx',
    responseType: 'arraybuffer'
})
.then(function (res) {
    //res.data ==>  ArrayBuffer(xxxx)
    const b64string = uint8arrayToBase64Str(res.data);
    const uint8ArrayData = arrayToUint8array(res.data);
    
    // do something

});
*/
function arrayToUint8array(data) {
    return new Uint8Array(data);
}


/**
 * uint8array to base64 string
 * @param {Uint8Array|Array} data 
 * @returns {String}
 */
function uint8arrayToBase64Str(data) {
    if (typeof Buffer !== typeof undefined) {
        return Buffer.from(data, 'binary').toString('base64');  // node.js too
    } else {

        // prevent ERROR:  RangeError: Maximum call stack size exceeded
        //!!!!!!!!!
        let binary = '';
        const bytes = new Uint8Array(data);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return window.btoa(binary);
    }
}


/**
 * decode base64 string
 * @param {String} data 
 * @returns {String}
 */
function decodeBase64Str(data) {
    // avoid messy code
    // especially for Chinese, avoid using encodeURIComponent() and encodeURI()
    const decoded = decodeURIComponent(escape(atob(data)));
    return decoded;
}


/**
 * integer to binary
 * @param {Number} data 
 * @returns {String}
 */
function toBinary(data) {
    if (!Number.isSafeInteger(data)) {
        throw new TypeError('value must be a safe integer');
    }
    return (data >>> 0).toString(2);
}


/**
 * array to blob
 * @param {Uint8Array} uint8ArrayData 
 * @returns {Blob}
 */
function arrayToBlob(uint8ArrayData) {
    return new Blob(uint8ArrayData, {
        type: "text/plain"
    });
}




/**
 * blob to uint8array
 * @param {Blob} data 
 * @returns {Uint8Array}
 */
function blobToUint8array(data) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener("loadend", () => {
            resolve(reader.result); // ArrayBuffer(xxxx)
        });
        reader.readAsArrayBuffer(data);
    });
}



/**
 * array to stream
 * @param {Array<Uint8Array>} data 
 * @returns {ReadableStream }
 */
/* Example:

const uint8ArrayDataArr = [
    [137,80,78,71,13,10,26,10,0,0,0,13,73,72,68,82,0,0,0,30,0,0,0,30,8,6,0,0,0,59,48,174,162,0,0,0,220,73,68,65,84,72,199,237,214,81,14,194,32,12,0,80,60,128,215,219,49,28,91,118,10,55,216,53,188,132,137,39,19,71,130,75,69,42,148,194,76,116,31,253,89,40,111,233,104,153,48,198,136,111,132,216,225,255,134,143,151,166,84,28,150,152,151,24,158,207,182,130,45,106,92,12,91,193,16,93,241,218,112,8,181,113,174,9,163,232,90,234,130,223,50,134,142,47,135,11,36,216,183,57,49,81,29,67,125,120,116,11,238,12,60,9,133,240,228,45,180,120,91,11,133,112,31,72,176,184,100,162,19,150,3,75,157,139,147,209,208,225,234,136,184,202,65,177,118,146,200,102,178,20,250,169,143,49,188,43,129,198,6,136,116,101,246,55,191,33,168,162,116,65,108,114,97,56,11,77,29,153,109,4,87,57,195,38,117,86,95,75,162,20,56,84,114,205,153,233,148,219,9,226,154,123,131,81,175,69,201,41,239,27,188,255,222,254,52,252,0,234,253,186,89,222,225,73,252,0,0,0,0,73,69,78,68,174,66,96,130]
];
const readableStream = arrayToStream(uint8ArrayDataArr);  

*/
function arrayToStream(data) {
    // @return --> ReadableStream {locked: false}
    return new ReadableStream({
        start(controller) {
            // push a chunk
            data.forEach(function(chunk) {
                controller.enqueue(new Uint8Array(chunk));
            });
        },

        pull(controller) {
            // Called `read()` when the controller's queue is empty.
            //controller.enqueue(...);
            controller.close();
        },

        cancel(reason) {
            // Called when the stream is canceled.
        },
    })
}




/**
 * read stream
 * @param {ReadableStream } data 
 * @returns {Promise}
 */
/* Example:

readStream(readableStream).then((value) => {
    console.log(value);
    // iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAA3ElEQVRIx+3WUQ7CIAwAUDyA19sxHFt2CjfYNbyEiScTR4JLRSqUwkx0H/1ZKG/paJkwxohvhNjh/4aPl6ZUHJaYlxiez7aCLWpcDFvBEF3x2nAItXGuCaPoWuqC3zKGji+HCyTYtzkxUR1DfXh0C+4MPAmF8OQttHhbC4VwH0iwuGSiE5YDS52Lk9HQ4eqIuMpBsXaSyGayFPqpjzG8K4HGBoh0ZfY3vyGoonRBbHJhOAtNHZltBFc5wyZ1Vl9LohQ4VHLNmemU2wnimnuDUa9FySnvG7z/3v40/ADq/bpZ3uFJ/AAAAABJRU5ErkJggg==
    
    // test: <img src="data:image/png;base64,iVBORw0KGgo..." >
     
});
*/

async function readStream(data) {
    let resReceived = '';
    const stream = data; // ReadableStream {locked: false}
    const readInto = async (stream) => {
        const reader = stream.getReader();

        async function pump() {
            const { done, value } = await reader.read();

            if (done) {
                return;
            }

            // value for fetch streams is a Uint8Array
            const base64String = uint8arrayToBase64Str(value);
            resReceived += base64String;

            return pump();
        }
        return pump();
    }
    await readInto(stream);
    
    return resReceived;
}



export {
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
}