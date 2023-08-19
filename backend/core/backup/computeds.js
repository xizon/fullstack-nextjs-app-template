/**
 * file size calculator
 */
const fileSizeMegabytes = (num_mb) => (
    Number(num_mb) * 1024 * 1024 * 1024
);

/**
 * bytes to Megabytes
 */
const bytesConvertToMegabytes = (fileSizeInBytes) => (
    Number(fileSizeInBytes) / (1024 * 1024)
);



module.exports = {
    fileSizeMegabytes,
    bytesConvertToMegabytes
}     
