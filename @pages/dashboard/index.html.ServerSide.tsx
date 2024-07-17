import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Layout from '@/components/Layout';

import Userinfo from '@/components/Dashboard/Userinfo';
import DataList from '@/components/Dashboard/Datalist';
import cookies from 'next-cookies';

// Authority 
import useAuth from '@/utils/hooks/useAuth';


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



/** This gets called on every request 
 * ---------------------------------
*/
export async function getServerSideProps(context) {

    console.log('Local Url: ', `//${context.req.headers.host}`);

    const apiPath = apiUrls.TEST_API.replace('{reqUrl}',`//${context.req.headers.host.split(':')[0]}`); // Compatible with Docker

    // Authorize the page and manage permissions by `middleware`
    const token = cookies(context).SITE_DATA_LOGIN_COOKIE;
    console.log('Token: ', token);

    let mycontent: any = null;

    /*
    try {

        // ASYNC REQUEST:
        // a) Special Note: When using asynchronous requests, you need to add "http" or "https" protocol to access normally, 
        // b) otherwise you will get the code of "proxy.pac"
        // c) [production] mode will not automatically bring the protocol
        // d) If successful, check the source code and you will see [null], but the actual rendered value exists
        const url = new URL(context.req.headers.referer);
        const protocol = url.protocol.replace(':', '');
        const targetUrl = /(http|https)/i.test(apiPath) ? apiPath : `${protocol}:${apiPath}`;
        const res = await axios.get(targetUrl, { responseType: 'json' });

        if (res.data.code != 1000) mycontent = res.data.data;  //required

    } catch (e) { }
    */


    return {
        props: {
            apiPath: apiPath,
            mycontent: mycontent,
        },
    }

}


export default Dashboard;



