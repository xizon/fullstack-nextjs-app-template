/* 
 *************************************
 * <!-- Header -->
 *************************************
 */
import Link from 'next/link';
export default function Header(props) {

    return (
        <>
            
            <header>
                <div className="container">
                    <div className="brand">
                        <Link href="/"><span><img src="/assets/images/logo.png" /></span>Website Title<small style={{ fontSize: 10, paddingLeft: 20 }} id="loading">{props.loading ? 'loading...' : ''}</small></Link>
                    </div>
                    <nav className="menu">
                        {props.menu}
                    </nav>

                </div>
            </header>

        </>
    )
}

