import Head from 'next/head';
import Layout from '@/components/Layout';


// Dynamically import components
// Delay loading components to improve performance
import dynamic from 'next/dynamic';
const MyButton = dynamic(() => import('@/components/Buttons'), { ssr: false });



const MainContent = () => {
    return (
        <>
            <p>This is a dynamically imported button, which will delay loading to improve performance.</p>
            <MyButton btnName={'Submit'} bgColor={'success'} />

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
