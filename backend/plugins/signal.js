// Stop running node in docker with Ctrl+C sends the SIGINT signal.
// Usage: docker run --init -p <host_port>:<container_port<image_name:version>
const process = require('process');

const run = () => {
    process.on('SIGINT', () => {
        console.info('Interrupted')
        process.exit(0);
    });
    
}

module.exports = run();
