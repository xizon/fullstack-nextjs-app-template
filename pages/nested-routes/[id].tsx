import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';


// store
import { useDispatch, useSelector } from "react-redux";
import getMenuData from "@/store/actions/demoMenuActions";


const MainContent = (props) => {
    return (
        <>
              <ul>
                <li>
                  <Link href={`/nested-routes/${props.data}/first-comment.html`}>
                    First comment
                  </Link>
                </li>
                <li>
                  <Link href={`/nested-routes/${props.data}/second-comment.html`}>
                     Second comment
                  </Link>
                </li>
              </ul>

        </>
    )

};


/** Render data
 * ---------------------------------
*/
const NestedRoutesChild = () => {

    const router = useRouter();
    const id = router.query.id as string;
    const idShow = id.replace('.html', '')

    // Get store
    const [dispatchUpdate, setDispatchUpdate] = useState<boolean>(false);
    const dispatch = useDispatch();
    const storeData = useSelector((state: any) => {
        return state.menuData;
    });
    
    useEffect(() => {

        // Get store
        //-----
        const fetchStoreMenu = async () => {
            if ( !dispatchUpdate ) {
                const res: any = await getMenuData();
                setDispatchUpdate(true);
                dispatch(res);
            }
        };
        fetchStoreMenu();
        
    }, [dispatchUpdate, dispatch]); 

    return (
        <>
            <Head>
                <title>{idShow}</title>
            </Head>

            <Layout
                pageTitle={idShow}
                nav={JSON.stringify(storeData.menuItems)}
                contentComponent={<><MainContent data={idShow} /></>}
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
            fallback: 'blocking',
        }
    }


    //
    //--------
    return {
        // String variant: paths must match the dynamic route shape.
        paths: [
            '/nested-routes/first.html',
            '/nested-routes/second.html'
        ],
        // We'll pre-render only these paths at build time.
        fallback: 'blocking'
    }
}


export async function getStaticProps() {
    return {
        props: {},
        
        // Incremental Static Regeneration. (Next.js will attempt to re-generate the page:)
        revalidate: 10, // In seconds 
    }  
}


export default NestedRoutesChild;

