
/**
 * Match all files URLs from string
 *
 * @param {String} str Input text
 * @return {Array} All matching files
 */
 function matchAllFilesUrls(str) {

    if (typeof str !== 'string') return [];

    let strGetAllUrls = str.match(/http[s]?:\/\/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/ig);
    // delete a query string parameter
    strGetAllUrls = strGetAllUrls.map(item => item.split('?')[0]);
    const strImagsAll = strGetAllUrls.filter(item => /\.(jpg|jpeg|png|svg|gif|webp|264|3ga|3gp|3gpp|3g2|asf|avi|f4v|flv|gvi|ipad|iphone|ipod|m2ts|m4v|mkv|mod|mov|mp4|mpg|mpeg|mts|ogg|rm|rmvb|vob|webm|wmv|ts|aac|ac3|aif|aifc|aiff|amr|caf|flac|m4a|m4b|m4r|mid|midi|mmf|mp3|oga|ogg|ra|ram|wav|wma|csv|doc|docx|pdf|zip|rar)$/i.test(item));
    return strImagsAll;
}


export {
    matchAllFilesUrls
}