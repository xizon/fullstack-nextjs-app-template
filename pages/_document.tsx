import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document(req) {
   
    const pathname = req.__NEXT_DATA__.page;
  
    return (
        <Html lang="en-US" dir="ltr">
            <Head>
                {/* <link rel="stylesheet" href="/assets/css/xxx.css" media="all" /> */}

                <link rel="icon" href="/assets/images/favicon/favicon-32x32.png" type="image/x-icon" />
                <link rel="shortcut icon" href="/assets/images/favicon/favicon-32x32.png" sizes="32x32" />
                <link rel="apple-touch-icon" href="/assets/images/favicon/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/assets/images/favicon/apple-touch-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/assets/images/favicon/apple-touch-icon-114x114.png" />
            </Head>
            <body>
                <Main />
                <NextScript />

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
        </Html>
    )
}