/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
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
        STATIC_URL: '/public',
    }
}

module.exports = nextConfig


