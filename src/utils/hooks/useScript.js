// import the script inside the react component
function addScript(id, url, defer = false, async = false) {

    const script = document.createElement('script');
    script.src = url;
    script.id = id;
    if (defer) script.defer = true;
    if (async) script.async = true;
    document.body.appendChild(script);
}


function removeScript(id) {

    const scriptElem = document.getElementById(id); 
    scriptElem.remove();
}


export {
    addScript,
    removeScript
}


