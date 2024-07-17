import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/components/Layout';


import apiUrls from '@/config/apiUrls';
import axios from "axios";


const MainContent = (props) => {

    return (
        <>
            <ul>

                {!props.data ? <>Loading...</> : props.data.map((post: any) => {
                    return (
                        <li key={post.name}>
                            <Link href={`/posts/${post.name}.html`} dangerouslySetInnerHTML={{ __html: `${post.name} - (region: ${post.region})` }}></Link>


                        </li>
                    );
                })}
            </ul>

        </>
    )

};


/** Render data
 * ---------------------------------
*/
function Posts({ currentData }) {

    const posts = currentData;

    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>


            <Layout
                pageTitle="Posts"
                contentComponent={<><MainContent data={posts} /></>}
            />


        </>
    )
};


/** This gets called on every request 
 * ---------------------------------
*/
export async function getStaticProps() {

    const res: any = await axios.get(apiUrls.RECEIVE_DEMO_LIST);

    // Object variant: paths must match the dynamic route shape.npm st
    const testSpecialStr = (s) => {
        if (s.match(/\W/)) {
            return true;    // Contains at least one special character or space
        } else {
            return false;
        }
    };

    // Pass data to the page via props
    return {
        props: {
            currentData: res.data.filter(v => !testSpecialStr(v.name))
        },

        // Incremental Static Regeneration. (Next.js will attempt to re-generate the page:)
        // !!! IMPORTANT:  Error: ISR cannot be used with "output: export"
        revalidate: process.env.exportHtml == 'true' ? undefined : 10, // In seconds 
    }
}

export default Posts;
