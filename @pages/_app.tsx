/*
--------------------------------------------------------------------------
 Route-Based Resource Loading
--------------------------------------------------------------------------

 Load independent CSS stylesheets and React components only when the
 current route matches a specific URL pattern.

 This approach helps keep separate website sections independent and
 avoids loading unnecessary resources on unrelated pages.

 -------------------------------------------------------------------------
 1. Install Sass
 -------------------------------------------------------------------------

   npm install -D sass

 -------------------------------------------------------------------------
 2. Compile SCSS into CSS
 -------------------------------------------------------------------------

   Development (readable CSS):

   npx sass src/styles.other/globals.scss public/assets.other/css/globals.css --no-source-map

   Production (compressed CSS):

   npx sass src/styles.other/globals.scss public/assets.other/css/globals.min.css --style=compressed --no-source-map

 -------------------------------------------------------------------------
 3. Detect the current route
 -------------------------------------------------------------------------

   import { useRouter } from 'next/router';

   const router = useRouter();
   const isOtherPage = router.pathname.startsWith('/my-custom-page');

 -------------------------------------------------------------------------
 4. Load the corresponding stylesheet
 -------------------------------------------------------------------------

   <Head>
       {isOtherPage && (
           <link
               rel="stylesheet"
               href="/assets.other/css/globals.min.css"
           />
       )}
   </Head>

 -------------------------------------------------------------------------
 5. Dynamically load independent components
 -------------------------------------------------------------------------

   import dynamic from 'next/dynamic';

   const DemoComponent = dynamic(
       () => import('@/components.other/DemoComponent')
   );

   {isOtherPage && <DemoComponent />}

 Notes:
 - Keep original SCSS files outside the public directory.
 - Compiled CSS files are served directly from the public directory.
 - Use readable CSS during development and minified CSS in production.
 - Use next/dynamic to split independent React components into chunks.
 - Apply the same route condition to both stylesheets and components.
 - Repeat this pattern for other independent website sections as needed.

--------------------------------------------------------------------------
*/

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
                <meta name="viewport" content="width=device-width, initial-scale=1" />
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
