
//import md5 from 'md5';


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
            enable: true, // default
            maxTimeout: 10, // default (minutes)
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
            enable: true,  // default
            maxTimeout: 10, // default (minutes)
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
        this.RUN_TIME = null;
        
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
        const {enable, autoClear, clearDelay, maxTimeout, entry} = config;

        
        // orginal configuation
        let _enable = typeof enable !== 'undefined' ? enable : true;
        let _maxTimeout = typeof maxTimeout !== 'undefined' ? maxTimeout : 10;
        let _autoClear = autoClear;
        let _clearDelay = clearDelay;

        const fnName = rest[0];
        const incomingArgs = JSON.stringify(rest).replace(/\s/g, "_").replace(/[^a-zA-Z0-9 \u4E00-\u9FFF]/g, "");
        //const keyStr = fnName + '-' + md5(incomingArgs);
        const keyStr = fnName + '-' + incomingArgs;
        const keyGlobalStr = entry + '-' + JSON.stringify(rest[1]).replace(/\s/g, "_").replace(/[^a-zA-Z0-9 \u4E00-\u9FFF]/g, "");
        const executionStartTime = Date.now();
        const key = `${this.SPACE_NAME}${keyStr}`;        


        // get global configuration
        const globalConfig = sessionStorage.getItem(this.GLOBAL_CONFIG_PREFIX + keyGlobalStr);
        if (globalConfig !== null) {
            _enable = typeof JSON.parse(globalConfig).enable !== 'undefined' ? JSON.parse(globalConfig).enable : true;
            _maxTimeout = typeof JSON.parse(globalConfig).maxTimeout !== 'undefined' ? JSON.parse(globalConfig).maxTimeout : 10;
            _autoClear = JSON.parse(globalConfig).autoClear;
            _clearDelay = JSON.parse(globalConfig).clearDelay;
            
        }

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
            if (minutes > _maxTimeout) {
                this.clear();
                sessionStorage.removeItem(this.CACHE_DURATION);
            }

        }

      

        //
        const cache = sessionStorage.getItem(key);

        // load the cache
        if (cache !== null && cache != 'undefined' && _enable) {
            const _data = JSON.parse(cache);

            console.log(`cache (${_data.runtime}): `, key);
            return _data.data;
        }

        // execute function
        const _allCacheStartTime = Date.now();
        const cacheTuple = await incomingData();


        // disable cache
        if (!_enable) {
            return cacheTuple;
        }


        // run time
        const _cacheDuration = Date.now() - _allCacheStartTime;
        this.RUN_TIME = `${_cacheDuration}ms`;

        // save data
        sessionStorage.setItem(key, JSON.stringify({
            runtime: this.RUN_TIME,
            data: cacheTuple
        }));


        // Calculate debounce time
        const executionEndTime = Date.now();
        const processingTime = executionEndTime - executionStartTime;  // ms
        let debounceDuration = processingTime * 20;
        if ( debounceDuration > 5000 ) debounceDuration = 5000;

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


