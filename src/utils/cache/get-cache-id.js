
/**
 * Get cache ID
 */

/*

// Example (for your Web Application, do not use in API)
//--------------------

const cacheId = getCacheReqId(SysService.getDictList)('', 0, 'CV02.01.101');
(window as any)[cacheId] = xxxxxxxx;

*/

function getCacheReqId(fn) {
    return (...args) => {

        const fnName = arguments[0].name;
        const incomingArgs = JSON.stringify(args).replace(/\s/g, "_").replace(/[^a-zA-Z0-9 \u4E00-\u9FFF]/g, "");
        const keyStr = fnName + '-' + incomingArgs;
     
        return keyStr;
    };
}

/**
 * Set cache configuration from ID
 */


/*

// Example (for your Web Application, do not use in API)
//--------------------

// Prevent request for this ID from automatically clearing the cache
setCacheReqConfig(SysService.getDictList, {
    enable: true, // default
    maxTimeout: 10, // default (minutes)
    autoClear: false,
    clearDelay: null
})('', 0, 'CV02.01.101');


*/



function setCacheReqConfig(fn, myConfig) {

    return (...args) => {

        const fnName = arguments[0].name;
        const incomingArgs = JSON.stringify(args).replace(/\s/g, "_").replace(/[^a-zA-Z0-9 \u4E00-\u9FFF]/g, "");
        const keyGlobalStr = fnName + '-' + incomingArgs;

        sessionStorage.setItem('CACHE_REQ_GLOBAL_CONFIG__' + keyGlobalStr, JSON.stringify(myConfig));
     
        return keyGlobalStr;
    };
}




export {
    getCacheReqId,
    setCacheReqConfig
}


