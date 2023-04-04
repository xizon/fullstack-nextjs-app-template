import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Button from '@/components/Buttons';
import Layout from '@/components/Layout';
import SocialMetadata from '@/components/SocialMetadata';


import SvgIcon from "../public//assets/images/icon.svg";
import CRUDService from "@/utils/data-service/crud";

import appData from "@/data/app.json";


// store
import { useDispatch, useSelector } from "react-redux";
import getMenuData from "@/store/actions/demoMenuActions";



type Props = {
    protocol: string | null;
    host: string | null;
    path: string | null;
};


const MainContent = () => {
    return (
        <>
            <p>
                A website-building solution based on Next.js. It serves as a case to sort out the thinking.
            </p>
            <p className="buttons">
                <Button bgColor='' btnName={<><SvgIcon width="15" style={{ verticalAlign: 'text-top', marginRight: '10px' }} fill="#0576a0" />About US</>} href="/about.html" />
            </p>

        </>
    )

};


const Home: NextPage<Props> = () => {


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
                const res: any = await getMenuData(); // {type: 'RECEIVE_DEMO_MENU', payload: [...]}
                setDispatchUpdate(true);
                dispatch(res);
            }
        };

        fetchStoreMenu();


        // init php data
        //-----
        CRUDService.initData();
        
    }, [dispatchUpdate, dispatch]);

    return (
        <>

            <Head>
                <title>HomePage</title>
                <meta name="description" content="A whole-website building solution based on Next.js. It serves as a case to sort out the thinking." />

                <SocialMetadata
                    ogTitle={`HomePage`}
                    ogDesc={`A whole-website building solution based on Next.js. It serves as a case to sort out the thinking.`}
                    ogUrl={`${appData.siteUrl}/`}
                    ogImage={`${appData.siteUrl}/assets/images/logo-black.png`}
                />
            </Head>

            <Layout
                isHome={true}
                pageTitle="HomePage"
                nav={JSON.stringify(storeData.menuItems)}
                contentComponent={<><MainContent /></>}
            />

        </>
    )
}

export default Home;
