import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

import Userinfo from '@/components/Dashboard/Userinfo';
import DataList from '@/components/Dashboard/Datalist';
import cookies from 'next-cookies';

// Authority 
import isAdmin from '@/utils/is-admin';

// store
import { useDispatch, useSelector } from "react-redux";
import getMenuData from "@/store/actions/demoMenuActions";


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

    // Get store
    const [dispatchUpdate, setDispatchUpdate] = useState<boolean>(false);
    const dispatch = useDispatch();
    const storeData = useSelector((state: any) => {
        return state.menuData;
    });


    useEffect(() => {


        //Authority
        //-----
        const __IS_ADMIN = isAdmin();


        // Get store
        //-----
        const fetchStoreMenu = async () => {
            if ( !dispatchUpdate ) {
                const res: any = await getMenuData();
                setDispatchUpdate(true);
                dispatch(res);
            }
        };
        fetchStoreMenu();
        
    }, [dispatchUpdate, dispatch]); 

    return (
        <>
            <Head>
                <title>Dashboard</title>
            </Head>


            <Layout
                pageTitle="AbDashboardut"
                nav={JSON.stringify(storeData.menuItems)}
                contentComponent={<><MainContent /></>}
            />


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



