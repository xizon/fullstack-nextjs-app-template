/* 
 *************************************
 * <!-- Header -->
 *************************************
 */
import Link from 'next/link';
import Image from 'next/image';
import appData from "@/data/app.json";

export default function Header(props) {

    return (
        <>
            
            <header>
                <div className="container">
                    <div className="brand">
                        <Link href="/"><span><Image width={0} height={0} sizes="100vw" style={{ width: '100%', height: 'auto' }} src="/assets/images/logo.png" alt={''} /></span>{`${appData.siteName}`}</Link>
                    </div>
                    <nav className="menu">
                        {props.menu}
                    </nav>

                </div>
            </header>

        </>
    )
}

