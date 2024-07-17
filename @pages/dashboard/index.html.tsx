import Head from 'next/head';
import { useEffect } from 'react';
import Layout from '@/components/Layout';

import Userinfo from '@/components/Dashboard/Userinfo';
import DataList from '@/components/Dashboard/Datalist';

// Authority 
import useAuth from '@/utils/hooks/useAuth';

import { useRouter } from 'next/navigation';

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

    const router = useRouter();
    const { isAuthenticated } = useAuth();

    console.log('[Dashboard] useAuth() -> isAuthenticated: ', isAuthenticated);

    useEffect(() => {

        //Authority
        //-----
        if ( !isAuthenticated ) {
            router.push('/sign-in.html');
        }


    }, [isAuthenticated]); 

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>


            <Layout
                pageTitle="Dashboard"
                contentComponent={<><MainContent /></>}
            />


        </>
    )
};


export default Dashboard;



