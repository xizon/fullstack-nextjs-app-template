
/**
 * Disk Cache
 * @version 0.1.0
 */
/*

// Example
//--------------------

// create a new
axios({
    method: 'get',
    url: 'http://xxxxx.(png|js|xxxx)',
    responseType: 'arraybuffer'
})
.then(function (response) {
    const b64string = CoreUtils.return('uint8arrayToBase64Str', response.data);
    CacheDisk.new('http://xxxxx.(png|js|xxxx)', b64string);
});


// get cache
// for .js file
CacheDisk.get('http://xxxxx.js', true).then((response) => {
    console.log(response); //decoded string
});

// for image file
CacheDisk.get('http://xxxxx.png').then((response) => {
    console.log(response); //base64 string
});


// delete
CacheDisk.delete(apiPath).then((response) => {
    console.log(response); // true
});


// clear all
CacheDisk.clear().then((response) => {
    console.log(response); // true
});


*/
class CacheDisk {
    
    constructor() {
        this.caches = null;
        this.SPACE_NAME = 'web-cache-v1';
    }

    async init() {
        const newCache = await caches.open(this.SPACE_NAME);
        return newCache;
    }


    async new(fileName, responseContent) {
        this.caches = await this.init();
        this.caches.add(fileName);

        const options = {
            method: "GET"
          }  
        this.caches.add(new Request(fileName, options));

        // Create a new entry for cats.json and store the generated response
        this.caches.put(fileName, new Response(responseContent));

    }


    async get(fileName, decode = false) {
        this.caches = await this.init();
    
        // retrieve a new response
        const request = fileName;
        const options = {
            ignoreVary: true, // ignore differences in Headers
            ignoreMethod: true, // ignore differences in HTTP methods
            ignoreSearch: true // ignore differences in query strings
        }

        const resReceivedArr = [];
        const response = await this.caches.match(request, options);
        

        /*
        Example 1:
        ------------------
        if (response.status === 200) {
            let resReceived = '';
            const stream = response.body;
            const reader = stream.getReader();

            reader.read().then(function processText({ done, value }) {
            
                if (done) {
                    console.log(resReceived);
                    return;
                }

                // value for fetch streams is a Uint8Array
                const resString = new TextDecoder().decode(value);
                resReceived += resString;

                // Read some more, and call this function again
                return reader.read().then(processText);
            });
        }
        */


        /*
        Example 2:
        ------------------
        if (response.status === 200) {
            let resReceived = '';
            const stream = response.body;
            const readAllChunks = (readableStream) => {
                const reader = readableStream.getReader();
                
                return pump();

                function pump() {
                    return reader.read().then(({ done, value }) => {
                        if (done) {
                            console.log(resReceived);
                            return;
                        }

                        // value for fetch streams is a Uint8Array
                        const resString = new TextDecoder().decode(value);
                        resReceived += resString;

                        return pump();
                    });
                }
            };

            readAllChunks(stream);
        }
         
        */

        /*
        Example 3:
        ------------------
        if (response.status === 200) {
            let resReceived = '';
            const stream = response.body;
            
            const readInto = async (stream) => {
                const reader = stream.getReader();

                async function pump() {
                    const { done, value } = await reader.read();

                    if (done) {
                        console.log(resReceived);
                        return;
                    }

                    // value for fetch streams is a Uint8Array
                    const resString = new TextDecoder().decode(value);
                    resReceived += resString;

                    return pump();
                }
                return pump();
            }
            
            await readInto(stream);
        }
         
        */
 

        if (response.status === 200) {

            const stream = response.body; // ReadableStream {locked: false}
            const readInto = async (stream) => {
                const reader = stream.getReader();

                async function pump() {
                    const { done, value } = await reader.read();

                    if (done) {
                        return;
                    }

                    // value for fetch streams is a Uint8Array
                    resReceivedArr.push(Array.from(value));

                    return pump();
                }
                return pump();
            }
            
            await readInto(stream);
            
        }
        
        // uint8array to base64 string
        const base64String = this.uint8arrayToBase64Str(resReceivedArr.flat());
        return decode ? this.decodeBase64Str(base64String) : base64String;
    }
    
    async delete(fileName) {
        // delete a cache entry
        const request = fileName;
        return await this.caches.delete(request);
    }

    async clear() {
        // delete an existing cache
        const cacheNames = await this.caches.keys();
        const clearAll = await Promise.all(
            cacheNames.map( (cacheName) => {
                return this.caches.delete(cacheName);
            })
        );
        const deleteAll = clearAll.every((item) => item);    

        return deleteAll;
    }


    uint8arrayToBase64Str(data) {
        if (typeof Buffer !== typeof undefined) {
            return Buffer.from(data, 'binary').toString('base64');  // node.js too
        } else {
            return btoa(String.fromCharCode.apply(null, data));
        }
    }

    decodeBase64Str(data) {
        // avoid messy code
        // Especially for Chinese, avoid using encodeURIComponent() and encodeURI()
        const decoded = decodeURIComponent(escape(atob(data)));
        return decoded;
    }
    


}

const Cache = new CacheDisk();
export default Cache;


