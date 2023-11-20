import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '@/components/Layout';

import Userinfo from '@/components/Dashboard/Userinfo';
import DataList from '@/components/Dashboard/Datalist';
import cookies from 'next-cookies';

// Authority 
import useAuth from '@/utils/hooks/useAuth';

import useRouterChange from '@/utils/hooks/useSafePush';


import apiUrls from '@/config/apiUrls';

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
const Dashboard = ({apiPath, mycontent}) => {

    const { isAuthenticated } = useAuth();
    const { safePush } = useRouterChange();

    useEffect(() => {

        //Authority
        //-----
        if ( !isAuthenticated ) {
            safePush('/sign-in.html');
        }


    }, [isAuthenticated]); 

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


export default Dashboard;



