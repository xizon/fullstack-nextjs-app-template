// import the style inside the react component
function addStyle(id, url) {

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


