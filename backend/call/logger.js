const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function run(file,filepath,arg) {
    try {
        const _filepath = `${filepath}${file}`;

        const { stdout, stderr } = await exec(_filepath);
        console.log('stdout:', stdout);
        console.log('stderr:', stderr);
    } catch (error) {
        console.error(error);
    };
};


process.on('message', (message) => {
    console.log("message: ", message);  // { data: {...}, message: 'OK', code: 200 }
 
    const { file,filepath,arg } = message.data;
    
    if (typeof file !== 'undefined') {
        run(file,filepath,arg);
        //require("openurl").open(url);
    }
});