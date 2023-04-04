import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';


// store
import { useDispatch, useSelector } from "react-redux";
import getMenuData from "@/store/actions/demoMenuActions";


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
                <title>Nested Routes</title>
            </Head>


            <Layout
                pageTitle="Nested Routes"
                nav={JSON.stringify(storeData.menuItems)}
                contentComponent={<><MainContent /></>}
            />


        </>
    )
};


export default NestedRoutes;
