// Parses HTML source code for scripts, styles and content 
function externalFiles(str) {
    return str
        .replace(/(<script id="react.*>([\s\S]*?)<\/script>)/gim, '')
        .replace(/(<script id="react-dom.*>([\s\S]*?)<\/script>)/gim, '');
}

function getFilesFromHead(str) {
    if (typeof str !== 'string') return { scriptUrl: [], styleUrls: [] };

    const _getHead = str.match(/<head\b[^>]*>([\s\S]*?)<\/head>/gs);
    let headContent = _getHead[0]
        .replace(/(<head\b[^>]*>|<\/head>)/g, '')
        .replace(/<meta\b[^>]*>/ig, '')
        .replace(/<title\b[^>]*>(.*?)<\/title>/ig, '')
        .replace(/<link\s*rel="(icon|shortcut|apple-touch-icon|manifest)\b[^>]*>/ig, '');

    headContent = externalFiles(headContent);

    const scriptUrls = headContent === '' ? [] : headContent.match(/<script [^>]*src="[^"]*"[^>]*>/gm)
        .map(x => x.replace(/.*src="([^"]*)".*/, '$1'));
    const styleUrls = headContent === '' ? [] : headContent.match(/<link [^>]*href="[^"]*"[^>]*>/gm)
        .map(x => x.replace(/.*href="([^"]*)".*/, '$1'));


    return { scriptUrls, styleUrls };


}

function getBodyCode(str) {
    if (typeof str !== 'string') return '';

    const _getBody = str.match(/<body\b[^>]*>([\s\S]*?)<\/body>/gs);
    let bodyContent = _getBody[0]
        .replace(/(<body\b[^>]*>|<\/body>)/g, '')
        .replace(/<noscript\b[^>]*>(.*?)<\/noscript>/ig, '');
    bodyContent = externalFiles(bodyContent);

    return { bodyContent };
}


export {
    getFilesFromHead,
    getBodyCode
}