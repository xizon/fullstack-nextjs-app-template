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
                        <Link href="/"><span><img src="/assets/images/logo.png" /></span>Website Title</Link>
                    </div>
                    <nav className="menu">
                        {props.menu}
                    </nav>

                </div>
            </header>

        </>
    )
}

