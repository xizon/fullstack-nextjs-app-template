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



/*
[Class Version:]
==== Warning: Using this method may cause an error with `npm run build` ====

import Document,
{
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from 'next/document';
import Script from 'next/script';
import axios from 'axios';
import apiUrls from '@/config/apiUrls';

class MyDocument extends Document {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps & { configData }> {
        const originalRenderPage = ctx.renderPage;

        // Run the React rendering logic synchronously
        ctx.renderPage = () =>
            originalRenderPage({
                // Useful for wrapping the whole react tree
                enhanceApp: (App) => App,
                // Useful for wrapping in a per-page basis
                enhanceComponent: (Component) => Component,
            })


        // Run the parent `getInitialProps`, it now includes the custom `renderPage`
        const initialProps = await Document.getInitialProps(ctx);

        // other requests
        const res = await axios({
            method: 'get',
            url: apiUrls.MENU
        });
        const configData = {
            menuData: res.data.data
        };
    

        return { ...initialProps, configData };
    }


    render() {

        // get request parameters
        const req: any = this.props;
        const pathname = req.__NEXT_DATA__.page;
        const menuData = typeof req.configData !== 'undefined' ? req.configData.menuData : [];

        console.log('--> req Data: ', pathname, menuData);
       
        return (
            <Html lang="en-US" dir="ltr">
            <Head>
            
                <link rel="icon" href="/assets/images/favicon/favicon-32x32.png" type="image/x-icon" />
                <link rel="shortcut icon" href="/assets/images/favicon/favicon-32x32.png" sizes="32x32" />
                <link rel="apple-touch-icon" href="/assets/images/favicon/apple-touch-icon-57x57.png" />
                <link rel="apple-touch-icon" sizes="72x72" href="/assets/images/favicon/apple-touch-icon-72x72.png" />
                <link rel="apple-touch-icon" sizes="114x114" href="/assets/images/favicon/apple-touch-icon-114x114.png" />
            </Head>
            <body>
                <Main />
                <NextScript />

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
}

export default MyDocument;



*/