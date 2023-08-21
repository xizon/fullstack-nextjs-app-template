/* 
 *************************************
 * <!-- Header -->
 *************************************
 */
import Link from 'next/link';
import Image from 'next/image';
export default function Header(props) {

    return (
        <>
            
            <header>
                <div className="container">
                    <div className="brand">
                        <Link href="/"><span><Image width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} src="/assets/images/logo.png" alt={''} /></span>Website Title</Link>
                    </div>
                    <nav className="menu">
                        {props.menu}
                    </nav>

                </div>
            </header>

        </>
    )
}

