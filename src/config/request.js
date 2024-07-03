import axios from "axios";
import apiUrls from '@/config/apiUrls';

/*
1. Compare the `pageCode` parameter in the URL with the `progSlug` variable in the current file
2. If `pageCode` and `progSlug` are not equal, cancel the HTTP request
*/
const progSlug = 'auto-page';


const createHttpInstance = (indicator = '') => {

    const ind = typeof indicator === 'undefined' || indicator === '' ? 'HTTP_INSTANCE' : `HTTP_INSTANCE_${indicator}`;

    if (typeof window[ind] === 'undefined' && window[ind] !== null) {

        const http = axios.create({
            timeout: 0,
            params: {},
        });

        const controller = new AbortController();

        /* Store requests */
        const sourceRequest = {};  // Record<string, any>
        http.interceptors.request.use(
            async (request) => {
                /* If the application exists cancel */
                if (typeof sourceRequest[request.url] === 'undefined') {
                    request.signal = controller.signal
                }
                return request;
            },
            error => {
                return Promise.reject(error);
            },
        );


        window[ind] = {
            http,
            controller
        };

        return {
            http,
            controller
        };
    } else {
        return window[ind];
    }


};



const abortHttpInstance = (indicator = '') => {
    const ind = typeof indicator === 'undefined' || indicator === '' ? 'HTTP_INSTANCE' : `HTTP_INSTANCE_${indicator}`;
    createHttpInstance(indicator).controller.abort();
    // delete window[ind];
};

const resetHttpInstance = (indicator = '') => {
    const ind = typeof indicator === 'undefined' || indicator === '' ? 'HTTP_INSTANCE' : `HTTP_INSTANCE_${indicator}`;
    delete window[ind];
};  

const asyncTimeout = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}; 


function siteUrl() {
    return apiUrls.TEST_API;
}
    

async function fetchPost(url, data = {}, headers = null) {
    let res;

    // Specify request instance ID
    const curUrl = new URL(window.location.href.replace(/\#/g, ''));
    const searchParams = new URLSearchParams(curUrl.search);
    const instanceSlug = searchParams.get('pageCode');

    
    if (instanceSlug !== null) {
        await asyncTimeout(0);

        const httpObj = createHttpInstance(progSlug);
        res = await httpObj.http.post(url, data, {
            headers
        }).catch(function (error) {
            console.log(error);
        });
    } else {
        const httpObj = createHttpInstance();
        res = await httpObj.http.post(url, data, {
            headers
        }).catch(function (error) {
            console.log(error);
        });
    }

    return res;
}

async function fetchGet(url, data = {}, headers = null) {
    let res;

    // Specify request instance ID
    const curUrl = new URL(window.location.href.replace(/\#/g, ''));
    const searchParams = new URLSearchParams(curUrl.search);
    const instanceSlug = searchParams.get('pageCode');

    if (instanceSlug !== null) {
        await asyncTimeout(0);

        const httpObj = createHttpInstance(progSlug);
        res = await httpObj.http.get(url, {
            params: data,
            headers
        }).catch(function (error) {
            console.log(error);
        });
    } else {
    
        const httpObj = createHttpInstance();
        res = await httpObj.http.get(url, {
            params: data,
            headers
        }).catch(function (error) {
            console.log(error);
        });

    }
    

    return res;
}


export {
    createHttpInstance,
    abortHttpInstance,
    resetHttpInstance,
    siteUrl,
    fetchPost,
    fetchGet
};

