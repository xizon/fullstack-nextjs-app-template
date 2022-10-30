import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          </Head>
          <Component {...pageProps} />

        {/*
        <Script
                strategy="beforeInteractive"
                id="myjs-file"
                src="/assets/js/xxxx.js"
            ></Script>
        */}
      </>
  )
}

export default MyApp
