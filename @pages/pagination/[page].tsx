import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';


import apiUrls from '@/config/apiUrls';
import axios from "axios";
import Pagination from '@/components/Pagination';
//page
import pageData from "@/data/page.json";



/** Render data
 * ---------------------------------
*/
function PostsPagination({ currentData, page, perPage }) {


    const [currentPage, setCurrentPage] = useState<number>(parseFloat(page));


    //
    const posts = currentData ? currentData.data : [];
    function handleGotoPageNumber(number) {

        //`number` comes from the public parameter thrown by the component `<Pagination />`
        //console.log( 'number: ', number );

        //
        setCurrentPage(number);
    }

    useEffect(() => {

        // page changed
        //-----
        setCurrentPage(parseFloat(page));

    }, [page]);

    return currentData === null ? null : (
        <>
            <Head>
                <title>{`Pagination(page ${page})`}</title>
            </Head>


            <Layout
                pageTitle={`Pagination(page ${page})`}
                contentComponent={<>
                    <ul>

                        {!posts ? <>Loading...</> : posts.map((item: any, i: number) => {
                            return (
                                <li key={i}>
                                    {item.name} - (email: {item.email})
                                </li>
                            );
                        })}
                    </ul>

                    <div>
                        <Pagination
                            apiUrl={`/pagination/{page}.html`}
                            gotoPageClickEvent={handleGotoPageNumber}
                            pageRangeDisplayed={2}
                            activePage={currentPage}
                            totalPages={currentData ? currentData.total_pages : 1}
                            previousLabel={<>Prev</>}
                            nextLabel={<>Next</>}
                            firstLabel={<>First</>}
                            lastLabel={<>Last</>}
                            align="center"
                            symmetry={true}
                            breakLabel="..."
                        />
                    </div>

                </>}
            />


        </>
    )
};



/** This gets called on every request 
 * ---------------------------------
*/

// pages/pagination/[page].tsx
// Generates `/pagination/1.html` and `/pagination/2.html`
export async function getStaticPaths() {

    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
            paths: [],
            fallback: process.env.exportHtml == 'true' ? false : 'blocking',
        }
    }


    //
    //--------
    const pages: number[] = [1, 2, 3];
    return {
        // Object variant: paths must match the dynamic route shape.
        paths: pages.map(pageNum => {
            return {
                params: {
                    page: `${pageNum}.html`
                }
            }
        }),
        // We'll pre-render only these paths at build time.
        fallback: process.env.exportHtml == 'true' ? false : 'blocking'
    }

}


export async function getStaticProps(context) {
    // from `HTTP Request`
    const { page } = context.params;

    const curPage: any = isNaN(page.replace('.html', '')) ? 1 : page.replace('.html', '');
    let res: any = null;
    try {
        res = await axios.get(apiUrls.RECEIVE_PAGE_LIST.replace('{page}', curPage));
    } catch (err) { };

    return {
        props: {
            currentData: res !== null ? res.data : null,
            page: curPage,
            perPage: pageData.perPage
        },

        // Incremental Static Regeneration. (Next.js will attempt to re-generate the page:)
        // !!! IMPORTANT:  Error: ISR cannot be used with "output: export"
        revalidate: process.env.exportHtml == 'true' ? undefined : 10, // In seconds 
    };

}

export default PostsPagination;



/*
#########################################################
##### Multiple params for getStaticPaths()  #############
#########################################################


import CoreUtils from '@/utils/CoreUtils';

// pages/discoveries/color/[color]/[page].tsx
// Generates `/pagination/color/black/1` and `/pagination/color/black/2`
export async function getStaticPaths() {

    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
            paths: [],
            fallback: process.env.exportHtml == 'true' ? false : 'blocking',
        }
    }


    //
    //--------
    let all: any[] = [];
    
    try {

        const res = await axios.get(`https://api/colorlist`);
        res.data.data.forEach( (item: any) => {
            const sortName = CoreUtils.return('toSlug', item.name);   // Please do not use `encodeURI` string
            const pageTotal = res !== null ? Math.ceil(parseInt(item.postcount) / pageData.perPage) : 1;
            const pages = new Array(pageTotal).fill(0);
    
            pages.forEach((item, i) => {
                all.push( {
                    params: {
                        color: `${sortName}`,
                        page: `${i+1}`
                    }
                } );
            }); 
        });
        
    } catch (err) { };


    return {
        // Object variant: paths must match the dynamic route shape.
        paths: all.map(p => {
            return p
        }),
        // We'll pre-render only these paths at build time.
        fallback: process.env.exportHtml == 'true' ? false : 'blocking'
    }


}


*/


/*
#########################################################
##### Multiple Axios Requests Into ReactJS State  #######
#########################################################


const myfunc = async () => {
    let res1, res2;

    try {
        const [data1, data2] = await axios.all([
            axios.get(`https://api/params1`),
            axios.get(`https://api/params2`)
        ]);
        res1 = data1;
        res2 = data2;

    } catch (err) { };

    return {
        currentData1: res1 !== null ? res1.data : null,
        currentData2: res2 !== null ? res2.data : 0,
    }
}
*/