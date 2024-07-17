import Head from 'next/head';
import Layout from '@/components/Layout';

const MainContent = () => {
    return (
        <>
            <p>That page has gone missing.</p>

        </>
    )

};


/** Render data
 * ---------------------------------
*/
const Error404 = () => {

    return (
        <>
            <Head>
                <title>404</title>
            </Head>


            <Layout
                pageTitle="404"
                contentComponent={<><MainContent /></>}
            />


        </>
    )
};


export default Error404;
