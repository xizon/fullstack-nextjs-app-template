
import md5 from 'md5';

/**
 * Cache a promise request
 * @version 0.1.0
 */

/*

// Example 1
//--------------------

todoFunc(param1, param2) {
    return new Promise((resolve, reject) => {
        // ...
        resolve(...)    
    })
}
async call(param1, param2) {
    
    const cacheData = Cache.memoize(todoFunc)(param1, param2);
    const [cacheName, cacheArgs] = cacheData.params;
    const res = await Cache.connect({
            autoClear: true,
            clearDelay: null
        }, async () => {

        const data = await cacheData.fn(...cacheArgs);

        // do something
        // ...

        return data;

    }, cacheName, cacheArgs);

    return res;
}

// Example 2
//--------------------

todoFunc2({param1, param2, param3}) {
    return new Promise((resolve, reject) => {
        // ...
        resolve(...)    
    })
}
async call2({...rest}) {
    
    const cacheData = Cache.memoize(todoFunc2)({...rest});
    const [cacheName, cacheArgs] = cacheData.params;
    const res = await Cache.connect({
            autoClear: true,
            clearDelay: null
        }, async () => {

        const data = await cacheData.fn(...cacheArgs);

        // do something
        // ...

        return data;

    }, cacheName, cacheArgs);

    return res;
}

*/

class CacheReq {
    
    constructor() {
        this.SPACE_NAME = 'CACHE_REQ__';
    }
  
    // destructuring parameters
    memoize(...rest) {
        return (...args) => {
            return {
                params: [arguments[0].name, args],
                fn: arguments[0]
            };
        };
    }


    async connect(config, incomingData, ...rest) {
        const {autoClear, clearDelay} = config;

        const fnName = rest[0];
        const keyStr = fnName + '-' + md5(JSON.stringify(rest).replace(/\s/g, "_").replace(/[^a-zA-Z0-9 \u4E00-\u9FFF]/g, ""));
        const executionStartTime = Date.now();
        const key = `${this.SPACE_NAME}${keyStr}`;
        const cache = sessionStorage.getItem(key);

        // load the cache
        if (cache !== null && cache != 'undefined') {
            return JSON.parse(cache);
        }

        // execute function
        const cacheTuple = await incomingData();
        sessionStorage.setItem(key, JSON.stringify(cacheTuple));


        // Calculate debounce time
        const executionEndTime = Date.now();
        const processingTime = executionEndTime - executionStartTime;  // ms
        const debounceDuration = processingTime * 20;

        // auto clear
        if ( autoClear === true ) {
            setTimeout(() => {
                sessionStorage.removeItem(key);
            }, clearDelay && !isNaN(clearDelay) ? clearDelay+processingTime : debounceDuration);
        }


        return cacheTuple;

    }

    clear() {

        // retrieve all sessionStorage items
        const items = { ...sessionStorage };
        const allCacheNames = Object.keys(items).filter(key => key.indexOf(this.SPACE_NAME) >= 0);
        
        // 
        allCacheNames.forEach(cacheName => {
            sessionStorage.removeItem(cacheName);
        });
    }

}

const Cache = new CacheReq();
export default Cache;


