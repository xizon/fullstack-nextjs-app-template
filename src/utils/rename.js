/**
 * Rename a file to another from URL path
 *
 * @param {string} filepath The current file path
 * @return {string} A new file name
 */
function renameFile(filepath) {

    const fileslug = filepath.split('//').pop();
    const filename = filepath.split('/').pop();
    const extension = filename.split('.').pop().toLowerCase();

    const newFilename = filename.replace(`.${extension}`, `-${fileslug.replace(/[^a-zA-Z ]/g, "")}.${extension}`);
    return newFilename;
    
}

// node & browser
module.exports = {
    renameFile
}