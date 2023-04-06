/* 
 *************************************
 * <!-- Loader -->
 *************************************
 */
 import { useEffect, useState } from 'react';
 import { useRouter } from 'next/router';


export default function Header(props) {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {

        const handleStart = (url) => (url !== router.asPath) && setLoading(true);
        const handleComplete = (url) => (url === router.asPath) && setTimeout(() => { setLoading(false) }, 2000);

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    });

    
    return (
        <>

         
            {/*<!-- LOADER -->*/}
            {loading ? <>
                <div id="loader">
                    <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#333">
                        <g fill="none" fillRule="evenodd">
                            <g transform="translate(1 1)" strokeWidth="2">
                                <circle strokeOpacity=".5" cx="18" cy="18" r="18"/>
                                <path d="M36 18c0-9.94-8.06-18-18-18">
                                    <animateTransform
                                        attributeName="transform"
                                        type="rotate"
                                        from="0 18 18"
                                        to="360 18 18"
                                        dur="1s"
                                        repeatCount="indefinite"/>
                                </path>
                            </g>
                        </g>
                    </svg>
                </div>
            </> : null}

            {/*<!-- /LOADER -->*/}


        </>
    )
}


