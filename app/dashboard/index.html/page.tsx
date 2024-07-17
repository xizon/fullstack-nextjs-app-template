import { headers } from 'next/headers';
import ClientPage from "./ClientPage";

import apiUrls from '@/config/apiUrls';


export async function generateMetadata({ params }) {
    
    return {
        title: 'Dashboard',
    }
}


async function getServerSideProps() {

    let apiPath: any = null;
    let mycontent: any = null;

    // to avoid `npm run export` command aborting with the error "couldn't be rendered statically because it used headers"
    try {
            
        const headersList = headers();
        const host = headersList.get('host');

        console.log('Local Url: ', `//${host}`);

        apiPath = apiUrls.TEST_API.replace('{reqUrl}',`//${host?.split(':')[0]}`); // Compatible with Docker


    } catch (err) { };


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
        apiPath: apiPath,
        mycontent: mycontent
    }
}



export default async function Dashboard() {

    const data = await getServerSideProps();

    return (
        <>
            <ClientPage  />

        </>
    )
}
