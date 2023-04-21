import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';


// store
import { wrapper } from "@/store/createStore";
import { Provider } from "react-redux";


function MyApp({ Component, ...rest }: AppProps) {

    const { store, props } = wrapper.useWrappedStore(rest);
    
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            </Head>

            <Provider store={store}>
                <Component {...props.pageProps} />
            </Provider>

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



        </>

    )
}

export default MyApp;
