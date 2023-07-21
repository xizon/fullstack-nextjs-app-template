
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
async callOne(param1, param2) {
    
    const cacheData = Cache.memoize(todoFunc)(param1, param2);
    const [cacheName, cacheArgs] = cacheData.params;
    const res = await Cache.connect({
            autoClear: true,
            clearDelay: null,
            entry: 'callOne'
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
async callTwo({...rest}) {
    
    const cacheData = Cache.memoize(todoFunc2)({...rest});
    const [cacheName, cacheArgs] = cacheData.params;
    const res = await Cache.connect({
            autoClear: true,
            clearDelay: null,
            entry: 'callTwo'
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
        this.GLOBAL_CONFIG_PREFIX = 'CACHE_REQ_GLOBAL_CONFIG__';
        this.CACHE_DURATION = 'CACHE_REQ_DURATION';
        
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
        const {autoClear, clearDelay, entry} = config;

        // orginal configuation
        let _autoClear = autoClear;
        let _clearDelay = clearDelay;

        // check cache duration
        const allCacheStartTime = sessionStorage.getItem(this.CACHE_DURATION);
        if (allCacheStartTime === null) {
            sessionStorage.setItem(this.CACHE_DURATION, Date.now());
        } else {
            const cacheDuration = Date.now() - parseFloat(allCacheStartTime);
            const cacheDurationDate = new Date(cacheDuration - 8*60*60*1000);
            const hours = cacheDurationDate.getHours();
            const minutes = cacheDurationDate.getMinutes();
            const seconds = cacheDurationDate.getSeconds();

            // time pivot (minutes)
            if (minutes > 10) {
                this.clear();
                sessionStorage.removeItem(this.CACHE_DURATION);
            }
        }


        //
        const fnName = rest[0];
        const incomingArgs = JSON.stringify(rest).replace(/\s/g, "_").replace(/[^a-zA-Z0-9 \u4E00-\u9FFF]/g, "");
        const keyStr = fnName + '-' + md5(incomingArgs);
        const keyGlobalStr = entry + '-' + JSON.stringify(rest[1]).replace(/\s/g, "_").replace(/[^a-zA-Z0-9 \u4E00-\u9FFF]/g, "");
        const executionStartTime = Date.now();
        const key = `${this.SPACE_NAME}${keyStr}`;
        const cache = sessionStorage.getItem(key);

        // get global configuration
        const globalConfig = sessionStorage.getItem(this.GLOBAL_CONFIG_PREFIX + keyGlobalStr);
        if (globalConfig !== null) {
            _autoClear = JSON.parse(globalConfig).autoClear;
            _clearDelay = JSON.parse(globalConfig).clearDelay;
        }


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
        if ( _autoClear === true ) {
            setTimeout(() => {
                sessionStorage.removeItem(key);
            }, _clearDelay && !isNaN(_clearDelay) ? _clearDelay+processingTime : debounceDuration);
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


