'use client'


import Layout from '@/components/Layout';
import Link from 'next/link';


const MainContent = (props) => {
    return (
        <>
            <ul>
                <li>
                    <Link href="/nested-routes/first.html">
                        click here to display First
                    </Link>
                </li>
                <li>
                    <Link href="/nested-routes/second.html">
                        click here to display Second
                    </Link>
                </li>
            </ul>


        </>
    )

};

export default function ClientPage(props) {

    return (
        <>

            <Layout
                pageTitle="Nested Routes"
                contentComponent={<><MainContent /></>}
            />


        </>
    )
}

