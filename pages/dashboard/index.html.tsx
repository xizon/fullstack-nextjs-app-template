import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Userinfo from '@/components/Dashboard/Userinfo';
import DataList from '@/components/Dashboard/Datalist';

import cookies from 'next-cookies';


import { useEffect } from 'react';

// Authority 
import isAdmin from '@/utils/is-admin.js';


/** Render data
 * ---------------------------------
*/
const Dashboard = () => {

    useEffect(() => {

        //Authority
        //-----
        const __IS_ADMIN = isAdmin();


    }, []); // Empty array ensures that effect is only run on mount and unmount

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>


            <main>
                <div className="page">
                    <Header />

                    <section className="intro intro-subpage">
                        <div className="container">

                            <h2>Dashboard</h2>
                            <Userinfo />
                            <DataList />

                        </div>
                    </section>

                </div>


            </main>

            <Footer />

        </>
    )
};

/** This gets called on every request 
 * ---------------------------------
*/
export async function getServerSideProps(context) {

    // Authorize the page and manage permissions by `middleware`
    const token = cookies(context).SITE_DATA_LOGIN_COOKIE;
    if (token !== undefined) {
        context.res.setHeader('Authorization', `JWT ${cookies(context).SITE_DATA_LOGIN_COOKIE}`);
    }

    return {
        props: {},
    }

}


export default Dashboard;



