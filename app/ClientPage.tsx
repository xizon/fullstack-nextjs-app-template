'use client'

import { useEffect } from 'react';
import Button from '@/components/Buttons';
import Layout from '@/components/Layout';


import SvgIcon from "../public//assets/images/icon.svg";
import CRUDService from "@/utils/data-service/crud";



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


export default function ClientPage(props) {

    useEffect(() => {

        // init php data
        //-----
        CRUDService.initData();


    }, []); // Empty array ensures that effect is only run on mount and unmount

    return (
        <>


            <Layout
                isHome={true}
                ssrNav={props.list}
                pageTitle="HomePage"
                contentComponent={<><MainContent /></>}
            />

        </>
    )
}
