import apiUrls from '@/config/apiUrls';
import axios from "axios";
import ClientPage from "./ClientPage";

//page
import pageData from "@/data/page.json";

export async function generateMetadata({ params }) {

    const page = params.page;
    const curPage: any = isNaN(page.replace('.html','')) ? 1 : page.replace('.html','');

    return {
        title: `Pagination(page ${curPage}) - Posts`,
        description: `Pagination(page ${curPage}) - Posts`
    }
}


export async function generateStaticParams() {
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return [];
    } else {

        return [
            { page: `1.html` },
            { page: `2.html` },
            { page: `3.html` }
        ];
    }
}


// using the `params` returned by `generateStaticParams`
// - /pagination/1.html
// - /pagination/2.html
// - /pagination/3.html

async function getServerSideProps(params) {

    const page = params.page;
    const curPage: any = isNaN(page.replace('.html','')) ? 1 : page.replace('.html','');


    let res: any = null;
    let currentData: any = null;

    // to prevent the export command from being interrupted or encountering HTTP status anomalies.
    try {
        res = await axios.get(apiUrls.RECEIVE_PAGE_LIST.replace('{page}', curPage));
        currentData = res.data;

    } catch (err) { };

    return currentData;
}


export default async function PostsPagination({ params }) {

    const page = params.page;
    const curPage: any = isNaN(page.replace('.html','')) ? 1 : page.replace('.html','');
    const data = await getServerSideProps(params);

    return (
        <>


            <ClientPage currentData={data} page={curPage} perPage={pageData.perPage} />

        </>
    )
}


