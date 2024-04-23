export default apiRemoteToLocal;
/**
 * Store remote resources as local
 *
 * @param {JSON} orginData The original API response data after the request
 * @param {Array} remoteSources Resources that need to be downloaded remotely
 * @return {Array} New resources after download
 */
declare function apiRemoteToLocal(orginData: JSON, remoteSources: any[]): any[];
