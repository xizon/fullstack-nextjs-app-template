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
    const styleElem = document.getElementById(id);
    styleElem.remove();
}


export {
    addStyle,
    removeStyle
}


