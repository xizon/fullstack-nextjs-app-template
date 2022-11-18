/* 
 *************************************
 * <!-- Header -->
 *************************************
 */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BackToTop from '@/components/BackToTop';


const Link = ({ children, href, ...attributes }) => {

    const router = useRouter();

    const handleClick = (e) => {
        e.preventDefault();
        router.push(href);
    }

    return (
        <a href={href} onClick={handleClick} {...attributes}>
            {children}
        </a>
    )
}


export default function Header() {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

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
            <BackToTop speed={700} easing="easeOut" />
            <header>
                <div className="container">
                    <div className="brand">
                        <Link href="/"><span><img src="/assets/images/logo.png" /></span>Website Title<small style={{ fontSize: 10, paddingLeft: 20 }} id="loading">{loading ? 'loading...' : ''}</small></Link>
                    </div>
                    <nav className="menu">
                        <Link href="/" className={router.pathname == "/" ? "nav-link active" : "nav-link"}>Home</Link>
                        <Link href="/about.html" className={router.pathname == "/about.html" ? "nav-link active" : "nav-link"}>About</Link>
                        <Link href="/nested-routes.html" className={router.pathname.indexOf('/nested-routes') >= 0 ? "nav-link active" : "nav-link"}>Nested Routes</Link>
                        <Link href="/posts.html"className={router.pathname.indexOf('/posts') >= 0 && router.pathname.indexOf('/posts-pagination/') < 0 ? "nav-link active" : "nav-link"}>Posts</Link>
                        <Link href="/posts-pagination/1.html" className={router.pathname.indexOf('/posts-pagination/') >= 0 ? "nav-link active" : "nav-link"}>Posts Pagination</Link>
                        <Link href="/sign-in.html" className={router.pathname == "/sign-in.html" ? "nav-link active" : "nav-link"}>Sign In</Link>
                        <Link href="/dashboard/index.html" className={router.pathname.indexOf( '/dashboard/' ) >= 0 ? "nav-link active" : "nav-link"}>Dashboard</Link>
                    </nav>

                </div>
            </header>

        </>
    )
}

