/**
 * binary to base64 string
 */
const binaryToBase64Str = (data) => (
    Buffer.from(data, 'binary').toString('base64')
);



module.exports = {
    binaryToBase64Str
}     
