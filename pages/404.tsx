import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

// store
import { useDispatch, useSelector } from "react-redux";
import getMenuData from "@/store/actions/demoMenuActions";


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

    // Get store
    const [dispatchUpdate, setDispatchUpdate] = useState<boolean>(false);
    const dispatch = useDispatch();
    const storeData = useSelector((state: any) => {
        return state.menuData;
    });
    


    useEffect(() => {

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
                <title>404</title>
            </Head>


            <Layout
                pageTitle="404"
                nav={JSON.stringify(storeData.menuItems)}
                contentComponent={<><MainContent /></>}
            />


        </>
    )
};


export default Error404;
