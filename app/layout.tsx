import Script from 'next/script';
import ProviderLayout from './ProviderLayout';
import appData from "@/data/app.json";
import type { Metadata } from 'next';
import type { Viewport } from 'next';
 
import { Suspense } from 'react';
import { NavigationEvents } from './components/navigation-events';
import Loader from '@/components/Loader';

// =========================================
// global styles
// =========================================
import '@/styles/globals.scss';


// =========================================
// global metadata
// =========================================
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
}

export const metadata: Metadata = {
    title: `${appData.siteName}`,
    description: 'A whole-website building solution based on Next.js. It serves as a case to sort out the thinking.',
    openGraph: {
        title: `${appData.siteName}`,
        description: 'A whole-website building solution based on Next.js. It serves as a case to sort out the thinking.',
        url: `${appData.siteUrl}/`,
        siteName: `${appData.siteName}`,
        images: [
            {
                url: `${appData.siteUrl}/assets/images/logo-black.png`, // Must be an absolute URL
                width: 800,
                height: 600,
            }
        ],
        type: 'website',
    },
    icons: [
        {
            rel: 'icon',
            type: 'image/x-icon',
            url: '/assets/images/favicon/favicon-32x32.png',
        },
        {
            rel: 'shortcut icon',
            sizes: '32x32',
            url: '/assets/images/favicon/favicon-32x32.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '57x57',
            url: '/assets/images/favicon/apple-touch-icon-57x57.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '72x72',
            url: '/assets/images/favicon/apple-touch-icon-72x72.png',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '114x114',
            url: '/assets/images/favicon/apple-touch-icon-114x114.png',
        },
    ],
}

// =========================================
// root layout
// =========================================
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en-US" dir="ltr">
            <body suppressHydrationWarning={true}>

                <ProviderLayout>
                    {children}
                </ProviderLayout>

                {/* Router events & Loading */}
                <Loader />
                <Suspense fallback={null}>
                    <NavigationEvents />
                </Suspense>


                {/*
                <Script
                        strategy="beforeInteractive"
                        id="myjs-file"
                        src="/assets/js/xxxx.js"
                    ></Script>
                */}


                {/* Global variables can be used anywhere (plugins, subpages, etc.) */}
                <Script
                    id="global-vars"
                    strategy="beforeInteractive"
                    dangerouslySetInnerHTML={{
                        __html: `
                window['NODE_ENV'] = '${process.env.NODE_ENV}';
                `,
                    }}
                />




            </body>
        </html>
    )
}

