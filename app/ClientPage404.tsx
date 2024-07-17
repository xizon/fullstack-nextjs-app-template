'use client'

import Layout from '@/components/Layout';


const MainContent = () => {
    return (
        <>
            <p>That page has gone missing.</p>

        </>
    )

};


export default function ClientPage(props) {

    return (
        <>


            <Layout
                isHome={true}
                ssrNav={props.list}
                pageTitle="404"
                contentComponent={<><MainContent /></>}
            />

        </>
    )
}
