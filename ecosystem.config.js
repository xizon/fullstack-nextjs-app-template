module.exports = {
    "apps": [
        {
            name: "nextserver",
            script: "node server.js",
            env: {
                NODE_ENV: "production"
            }
        },
        {
            name: "phpserver",
            script: "node backend/server-php.js",
            env: {
                NODE_ENV: "production"
            }
        },
    ]
};