/** @type {import('next').NextConfig} */

// Docker deployment
const dockerDeploymentEnabled = false;

// Static Exports
let exportHtmlEnabled = true;
if (dockerDeploymentEnabled) exportHtmlEnabled = false;

//
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,

    // !!! for docker (`output: 'standalone'`)
    // This will create a folder at .next/standalone which can then be deployed on its own without installing node_modules.
    
    output: dockerDeploymentEnabled ? 'standalone' : (exportHtmlEnabled ? 'export' : undefined), 

    // image optimize
    images: {
      unoptimized: process.env.NODE_ENV !== "production" ? false : true
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
        EXPORT_HTML: exportHtmlEnabled,
        STATIC_URL: '/public',
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


