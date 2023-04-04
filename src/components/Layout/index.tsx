/* 
 *************************************
 * <!-- Layout -->
 *************************************
 */
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import MultilevelDropdownMenu from '@/components/MultilevelDropdownMenu';


export default function Layout(props) {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const primaryMenuData = useMemo(() => {
        return JSON.parse(props.nav);
    }, [props.nav]);


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

            <main>

                {/*<!-- PAGE -->*/}
                <div className="page">
                    <Header loading={loading} menu={<MultilevelDropdownMenu data={primaryMenuData} />} />

                    
                    <section className={props.isHome ? `intro` : `intro intro-subpage`}>
                        <div className="container">
                            {props.isHome ? <h1>{props.pageTitle}</h1> : <h2>{props.pageTitle}</h2>}
                            {props.contentComponent}
                        </div>
                    </section>

                </div>
                {/*<!-- /PAGE -->*/}

                <Footer />

            </main>

            {/*<!-- BACK-TO-TOP -->*/}
            <BackToTop speed={700} easing="easeOut" />

        </>
    )
}

