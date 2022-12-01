import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialMetadata from '@/components/SocialMetadata';

import apiUrls from '@/config/apiUrls';
import axios from "axios";

import { matchAllFilesUrls } from '@/utils/match-string';
import { renameImage } from '@/utils/rename';

import appData from "@/data/app.json";


/** Render data
 * ---------------------------------
*/
function PostSingle({ currentData }) {

    // no date
    //---------
    if (currentData === null) return null;

    //
    //---------
    return (
        <>

            <Head>
                <title>{`${currentData.name} - Website Title`}</title>

                <meta name="description" content="A whole-website building solution based on Next.js. It serves as a case to sort out the thinking." />

                <SocialMetadata
                ogTitle={`${currentData.name} - Website Title`}
                ogDesc={`${currentData.name}`}
                ogUrl={`${appData.siteUrl}/posts/${currentData.name}.html`}
                ogImage={`${appData.siteUrl}${currentData.flag}`}
                />  
                
            </Head>


            <main>
                <div className="page">
                    <Header />

                    <section className="intro intro-subpage">
                        <div className="container">
                            <div key={currentData.name}>
                                <h2 dangerouslySetInnerHTML={{__html: currentData.name }} />
                                <img style={{ width: '220px', height: '150px' }} src={currentData.flag} />
                                <br />
                                <sub><strong>New path:</strong> {currentData.flag}</sub>
                            </div>
                        </div>
                    </section>

                </div>

            </main>

            <Footer />
        </>
    )

}


/** This gets called on every request 
 * ---------------------------------
*/

// pages/posts/[id].tsx
// Generates `/posts/title1.html` and `/posts/title2.html`
export async function getStaticPaths() {

    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
            paths: [],
            fallback: 'blocking',
        }
    }


    //
    //--------
    const res: any = await axios.get(apiUrls.RECEIVE_DEMO_LIST);
    return {
        // Object variant: paths must match the dynamic route shape.
        paths: res.data.map(post => {
            return {
                params: {
                    id: `${post.name}.html`
                }
            }
        }),
        // We'll pre-render only these paths at build time.
        fallback: 'blocking'
    }

}


export async function getStaticProps(context) {
    // from `HTTP Request`
    const { id } = context.params;

    let res: any = null;
    let odata: any = null;

    try {
        res = await axios.get(apiUrls.RECEIVE_DEMO_LISTDETAIL.replace('{id}', encodeURIComponent(id).replace('.html', '')));

        
        //update image URLs
        //---------
        odata = res.data[0];
        let orginData = JSON.stringify(odata);
        const allImages = matchAllFilesUrls(orginData);
        allImages.forEach((filepath) => {

            const newFilename = renameImage(filepath);

            //
            const re = new RegExp(filepath, "g");
            orginData = orginData.replace(re, `/static-remote/files/${newFilename}`);

        });

        odata = JSON.parse(orginData);
        

    } catch (err) { };


    return {
        props: {
            currentData: odata !== null ? odata : null
        },

        // Incremental Static Regeneration. (Next.js will attempt to re-generate the page:)
        revalidate: 10, // In seconds 
    };

}

export default PostSingle;





/*
############################################################
##### Iterate over all all IDs for getStaticPaths()  #######
############################################################

export async function getStaticPaths() {

    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
            paths: [],
            fallback: 'blocking',
        }
    }


    //
    //--------
    let all: any[] = [];
    let postsRequests: any[] = [];
    let postsResponses: any[] = [];
    
    try {

        const res = await axios
            .get(`https://api/get/all/postscount`)
            .then((response) => {
                return response.data;
            })
            .then((firstData) => {

                const pageTotal = firstData !== null ? Math.ceil(parseInt(firstData.data.total) / pageData.perPage) : 1;
                const pages = new Array(pageTotal).fill(0);

                //iterate over all axios requests
                pages.forEach( (item, i) => {
                    postsRequests.push(`https://api/post/page/${i+1}`);
                }); 
            });


            await axios.all(postsRequests).then(axios.spread((...responses) => {
                postsResponses = responses;
            })).catch(errors => {
                console.error(errors);
            })

            
            //iterate over all IDs
            postsResponses.forEach( (posts, i) => {
                posts.data.data.forEach( (item) => {
                    all.push( {
                        params: {
                            id: `${item.slug}`,
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
        fallback: 'blocking'
    }


}


*/
