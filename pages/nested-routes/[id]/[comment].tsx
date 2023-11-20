import Head from 'next/head';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';


const MainContent = (props) => {
    return (
        <>
            <h2>Nested Routes: {props.data.idShow}</h2>
            <p>Comment: {props.data.comment} ...</p>

        </>
    )

};


/** Render data
 * ---------------------------------
*/
const Comment = () => {

    const router = useRouter();
    const id = router.query.id as string;
    const comment = router.query.comment as string;
  
    const idShow = id.replace('.html', '')


    return (
        <>
            <Head>
                <title>{idShow}</title>
            </Head>

            <Layout
                pageTitle={idShow}
                contentComponent={<><MainContent data={{idShow, comment}} /></>}
            />


        </>
    )
};



/** This gets called on every request 
 * ---------------------------------
*/
export async function getStaticPaths() {

    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
            paths: [],
            fallback: process.env.exportHtml == 'true' ? false : 'blocking',
        }
    }


    //
    //--------
    return {
        // String variant: paths must match the dynamic route shape.
        paths: [
            '/nested-routes/first/first-comment.html',
            '/nested-routes/first/second-comment.html',
            '/nested-routes/second/first-comment.html',
            '/nested-routes/second/second-comment.html'
        ],
        // We'll pre-render only these paths at build time.
        fallback: process.env.exportHtml == 'true' ? false : 'blocking'
    }
}


export async function getStaticProps() {
    return {
        props: {},
        
        // Incremental Static Regeneration. (Next.js will attempt to re-generate the page:)
        // !!! IMPORTANT:  Error: ISR cannot be used with "output: export"
        revalidate: process.env.exportHtml == 'true' ? undefined : 10, // In seconds 
    }  
}


export default Comment;

