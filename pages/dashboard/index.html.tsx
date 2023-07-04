import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '@/components/Layout';

import Userinfo from '@/components/Dashboard/Userinfo';
import DataList from '@/components/Dashboard/Datalist';
import cookies from 'next-cookies';

// Authority 
import CoreUtils from '@/utils/CoreUtils';


const MainContent = () => {
    return (
        <>
            <Userinfo />
            <DataList />
        </>
    )

};


/** Render data
 * ---------------------------------
*/
const Dashboard = () => {

    useEffect(() => {


        //Authority
        //-----
        const __IS_ADMIN = CoreUtils.return('isAdmin');

    }, []); 

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>


            <Layout
                pageTitle="AbDashboardut"
                contentComponent={<><MainContent /></>}
            />


        </>
    )
};



/** This gets called on every request 
 * ---------------------------------
*/
export async function getServerSideProps(context) {

    console.log('Local Url: ', `${context.req.protocol}://${context.req.get('Host')}`);

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



