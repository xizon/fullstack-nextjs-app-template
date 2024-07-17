import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';


const MainContent = () => {
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


/** Render data
 * ---------------------------------
*/
const NestedRoutes = () => {


    return (
        <>
            <Head>
                <title>Nested Routes</title>
            </Head>


            <Layout
                pageTitle="Nested Routes"
                contentComponent={<><MainContent /></>}
            />


        </>
    )
};


export default NestedRoutes;
