import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';



// store
import { wrapper } from "@/store/createStore";
import { Provider } from "react-redux";


// auth
import { AuthProvider } from '@/contexts/JWTAuthContext';


// using disk cache
// import '../public/assets/css/xxx.css';


function MyApp({ Component, ...rest }: AppProps) {

    const { store, props } = wrapper.useWrappedStore(rest);

    // props passed by SSR on other pages
    const { currentData, apiPath } = props.pageProps;
    
    // console.log('_app.tsx -> currentData: ', currentData, ' | apiPath: ', apiPath);
    
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

            </Head>

            {/* If you use `<Script>` here, please use `function ScriptLoader(props) { return useMemo(() => <Script strategy="beforeInteractive" src={props.url} />, [])}` to avoid loading the same thing repeatedly js file */}

            <Provider store={store}>

                <AuthProvider>
                    <Component {...props.pageProps} />
                </AuthProvider>
                
            </Provider>


        </>

    )
}

export default MyApp;
