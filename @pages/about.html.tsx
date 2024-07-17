import Head from 'next/head';
import Layout from '@/components/Layout';



const MainContent = () => {
    return (
        <>
            <p>Sub page here.</p>
        </>
    )

};


/** Render data
 * ---------------------------------
*/
const About = () => {

    return (
        <>
            <Head>
                <title>About</title>
            </Head>


            <Layout
                pageTitle="About"
                contentComponent={<><MainContent /></>}
            />


        </>
    )
};


export default About;
