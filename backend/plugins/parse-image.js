const ColorThief = require('colorthief');

const getPaletteData = (path) => {
    return ColorThief.getPalette(path, 5, 10); // Promise
}


module.exports = {
    getPaletteData
}     
