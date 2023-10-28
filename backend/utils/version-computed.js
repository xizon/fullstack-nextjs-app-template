/**
 * Get latest version
 * @param {Array} data  -  such as: [{ name: "v12.3.0.pre" }, { name: "v12.2.5" }, { name: "v12.2.4" }]
 * @returns {String}
 */
function latestVer(data) {
    const highest = data
    .filter(({ name }) => !name.endsWith('.pre') && !name.includes('rc'))
    .reduce((a, b) =>
        0 < a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
            ? a
            : b
    );
    return highest;
}

module.exports = latestVer;