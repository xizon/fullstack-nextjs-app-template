/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

// Docker deployment
// To add support for Docker to an existing project, 
// you can directly set the `dockerDeploymentEnabled` property to `true`
const dockerDeploymentEnabled = false;

// Static Exports
let exportHtmlEnabled = process.env.EXPORT_ENABLED == 'false' ? false : true;
if (dockerDeploymentEnabled) exportHtmlEnabled = false;


//
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    // !!! for docker (`output: 'standalone'`)
    // This will create a folder at .next/standalone which can then be deployed on its own without installing node_modules.
    
    output: dockerDeploymentEnabled ? 'standalone' : !exportHtmlEnabled ? undefined : 'export', 

    // image optimize
    images: {
      unoptimized: true
    },


    //  add a page route with html extension 
    // Rename the file under pages directory to `.html.tsx`
    pageExtensions: ['html.jsx', 'jsx', 'js', 'tsx', 'ts'],
    // omit the html extension 
    trailingSlash: false,
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });

        return config;
    },
    env: {
        exportHtml: `${exportHtmlEnabled}`
    }
    /*
    async redirects() {
        return [
            {
                source: '/',
                destination: process.env.NODE_ENV === 'development' ? '/index.html' : '/',
                permanent: true,
            },
        ]
    },
    async headers() {
        return [
            {
                source: '/about',
                headers: [
                    {
                        key: 'x-custom-header',
                        value: 'my custom header value',
                    },
                    {
                        key: 'x-another-custom-header',
                        value: 'my other custom header value',
                    },
                ],
            },
        ]
    },
    */
}

module.exports = nextConfig


