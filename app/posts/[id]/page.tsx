import apiUrls from '@/config/apiUrls';
import appData from "@/data/app.json";
import axios from "axios";
import CoreUtils from '@/utils/CoreUtils';

import ClientPage from "./ClientPage";


export async function generateMetadata({ params }) {

    const id = params.id?.replace('.html', '');
    let res: any = null;
    let currentData: any = null;
  
    // to prevent the export command from being interrupted or encountering HTTP status anomalies.
    try {
        res = await axios.get(apiUrls.RECEIVE_DEMO_LISTDETAIL.replace('{id}', encodeURIComponent(id as string).replace('.html', '')));
        currentData = res.data[0];

    } catch (err) { };


    if (currentData === null) return;
    
    return {
        title: `${currentData.name} - Posts`,
        description: `${currentData.name} - Posts`,
        openGraph: {
            title: `${currentData.name} - Posts`,
            description: `${currentData.name} - Posts`,
            url: `${appData.siteUrl}/posts/${params.id}`,
            siteName: `${appData.siteName}`,
            images: [
                {
                    url: `${currentData.flag}`, // Must be an absolute URL
                    width: 800,
                    height: 600,
                }
            ],
            type: 'website',
        },
    }
}


// Incremental Static Regeneration. (Next.js will attempt to re-generate the page:)
// @https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating
// !!! IMPORTANT:  Error: ISR cannot be used with "output: export"
export const dynamicParams = true;
export const revalidate = process.env.exportHtml == 'true' ? undefined : 10; // In seconds 
export const dynamic = "force-static"; // the page data is fetched once and cached, not refetched on every load

export async function generateStaticParams() {
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return [];
    } else {

        let res: any = null;

        // to prevent the export command from being interrupted or encountering HTTP status anomalies.
        try {
            res = await axios.get(apiUrls.RECEIVE_DEMO_LIST);

            // Object variant: paths must match the dynamic route shape.npm st
            const testSpecialStr = (s) => {
                if (s.match(/\W/)) {
                    return true;    // Contains at least one special character or space
                } else {
                    return false;
                }
            };

            const paths = res.data.filter(v => !testSpecialStr(v.name)).map(post => {
                return { id: `${post.name}.html` };
            });

            res = paths;

        } catch (err) { };

    
        return res !== null ? res : [];
    }
    
}


// using the `params` returned by `generateStaticParams`
// - /posts/a.html
// - /posts/b.html
// - ...
async function getServerSideProps(params) {

    const id = params.id;

    let res: any = null;
    let currentData: any = null;
    
    // to prevent the export command from being interrupted or encountering HTTP status anomalies.
    try {
        res = await axios.get(apiUrls.RECEIVE_DEMO_LISTDETAIL.replace('{id}', encodeURIComponent(id).replace('.html', '')));

        //update image URLs
        //---------
        currentData = res.data[0];
        let orginData = JSON.stringify(currentData);
        const allImages = CoreUtils.return('matchAllFilesUrls', orginData);
        allImages.forEach((filepath) => {
            
            const newFilename = CoreUtils.return('renameFile', filepath);

            //
            const re = new RegExp(filepath, "g");
            orginData = orginData.replace(re, `/static-remote/files/${newFilename}`);

        });

        currentData = JSON.parse(orginData);

    } catch (err) { };

        
    
    return currentData !== null ? currentData : null;
}


export default async function PostDetail({ params }) {

    const data = await getServerSideProps(params);

    return (
        <>
            <ClientPage currentData={data} />

        </>
    )
}


