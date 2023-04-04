import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';


// Dynamically import components
// Delay loading components to improve performance
import dynamic from 'next/dynamic';
const MyButton = dynamic(() => import('@/components/Buttons'), { ssr: false });


// store
import { useDispatch, useSelector } from "react-redux";
import getMenuData from "@/store/actions/demoMenuActions";


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
                <title>About</title>
            </Head>


            <Layout
                pageTitle="About"
                nav={JSON.stringify(storeData.menuItems)}
                contentComponent={<><MainContent /></>}
            />


        </>
    )
};


export default About;
