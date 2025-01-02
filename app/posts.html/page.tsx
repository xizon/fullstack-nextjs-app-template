import apiUrls from '@/config/apiUrls';
import axios from "axios";

import ClientPage from "./ClientPage";


export async function generateMetadata({ params }) {
    
    return {
        title: 'Posts',
    }
}



// Incremental Static Regeneration. (Next.js will attempt to re-generate the page:)
// @https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
// !!! IMPORTANT:  Error: ISR cannot be used with "output: export"
// Exclude the "api/" directory
export const dynamic = "force-static"; // the page data is fetched once and cached, not refetched on every load

async function getServerSideProps() {

    let res: any = null;
  
    // to prevent the export command from being interrupted or encountering HTTP status anomalies.
    try {
        res = await axios.get(apiUrls.RECEIVE_DEMO_LIST);
      
    } catch (err) { };


    // Object variant: paths must match the dynamic route shape.npm st
    const testSpecialStr = (s) => {
        if (s.match(/\W/)) {
            return true;    // Contains at least one special character or space
        } else {
            return false;
        }
    };

    return res !== null ? res.data.filter(v => !testSpecialStr(v.name)) : [];
}


export default async function Posts() {

    const data = await getServerSideProps();

    return (
        <>
            <ClientPage list={data} />

        </>
    )
}

