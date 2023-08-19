import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';



// store
import { wrapper } from "@/store/createStore";
import { Provider } from "react-redux";


// stylesheets
// DO NOT use <link rel="stylesheet" href="xxx" media="all />
/** Bootstrap 5+ */
// import '../public/assets/css/bootstrap/5.2.3/bootstrap.min.css';



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


        </>

    )
}

export default MyApp;
