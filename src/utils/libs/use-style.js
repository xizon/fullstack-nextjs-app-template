/**
 * Import the style inside
 * @param {String} id 
 * @param {String} url 
 * @returns 
 */
function addStyle(id, url) {

    const el = document.getElementById(id); 
    if ( el !== null ) return;

    const head = document.getElementsByTagName('head')[0];
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    link.media = 'all';
    head.appendChild(link);
}


function removeStyle(id) {
    const el = document.getElementById(id);
    if ( el !== null ) el.remove();
}


export {
    addStyle,
    removeStyle
}


