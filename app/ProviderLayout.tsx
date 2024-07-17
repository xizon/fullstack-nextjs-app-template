'use client'


// store
import { store } from "@/store/createStore";
import { Provider } from "react-redux";


// auth
import { AuthProvider } from '@/contexts/JWTAuthContext';


// using disk cache
// import '../public/assets/css/xxx.css';


export default function ProviderLayout({children}) {

    return (
        <>

            {/* If you use `<Script>` here, please use `function ScriptLoader(props) { return useMemo(() => <Script strategy="beforeInteractive" src={props.url} />, [])}` to avoid loading the same thing repeatedly js file */}

            <Provider store={store}>

                <AuthProvider>
                    {children}
                </AuthProvider>
                
            </Provider>


        </>

    )
}
