/**
 * Rename a file to another from URL path
 *
 * @param {String} filepath The current file path
 * @return {String} A new file name
 */
function renameFile(filepath) {

    const fileslug = filepath.split('//').pop();
    const filename = filepath.split('/').pop();
    const extension = filename.split('.').pop().toLowerCase();

    const newFilename = filename.replace(`.${extension}`, `-${fileslug.replace(/[^a-zA-Z ]/g, "")}.${extension}`);
    return newFilename;
    
}

export {
    renameFile
}