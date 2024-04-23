
import apiUrls from '../../config/apiUrls';
import axios from 'axios';

/**
 * Store remote resources as local
 *
 * @param {JSON} orginData The original API response data after the request
 * @param {Array} remoteSources Resources that need to be downloaded remotely
 * @return {Array} New resources after download
 */

/* Usage:


import { useState, useEffect } from 'react';
import CoreUtils from '@/utils/CoreUtils';

function Example() {

    const [odata, setOdata] = useState({a:1,flag:"https://path.jpg"});
    useEffect(() => {

        // Download and update image URLs from remote server
        // 
        // !!!!Note: that if you use the production environment, you cannot monitor the newly added resources in the `public` 
        // in real time, and you need to restart, so we download remote files via `npm run build`
        const formatData = async () => {

            if ( odata === null ) return;

            let orginData = JSON.stringify(odata);
            const allImages = CoreUtils.return('matchAllFilesUrls', orginData);
            const newData = await CoreUtils.return('apiRemoteToLocal', odata, allImages);
            setOdata( newData );       
        };

        formatData();

    }, []);

    return (...)

}


*/
async function apiRemoteToLocal(orginData, remoteSources) {

    let _res = JSON.stringify(orginData);

    try {

        const allRequests = [];
        const allRequestsPush = (url) => {
            allRequests.push(axios.get(apiUrls.DOWNLOAD_REMOTE_FILE.replace('{sourceurl}', url)));
        };

        remoteSources.forEach((item) => {
            allRequestsPush(item);
        });


        await axios.all(allRequests).then(axios.spread((...responses) => {

            remoteSources.forEach((item, i) => {
                const re = new RegExp(item, "g");
                _res = _res.replace(re, responses[i].data);
            });


        })).catch(errors => {
            console.error(errors);
        });


        /*
        remoteSources.forEach(element => {
            let response = await axios.get(`http://localhost:3000/api/extract-file?sourceurl={sourceurl}`.replace('{sourceurl}', currentData.flag));

            setOdata(state => ({ ...state, flag: response.data }));       
        });
        */


    } catch (err) { };

    return JSON.parse(_res);

}


export default apiRemoteToLocal;