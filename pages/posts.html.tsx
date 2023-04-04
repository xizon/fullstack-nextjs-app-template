import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';


import apiUrls from '@/config/apiUrls';
import axios from "axios";


// store
import { useDispatch, useSelector } from "react-redux";
import getMenuData from "@/store/actions/demoMenuActions";


const MainContent = (props) => {

    return (
        <>
              <ul>

                {!props.data ? <>Loading...</> : props.data.map((post: any) => {
                  return (
                    <li key={post.name}>
                      <Link href={`/posts/${post.name}.html`} dangerouslySetInnerHTML={{__html: `${post.name} - (region: ${post.region})` }}></Link>

                      
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
                <title>Posts</title>
            </Head>


            <Layout
                pageTitle="Posts"
                nav={JSON.stringify(storeData.menuItems)}
                contentComponent={<><MainContent data={posts}/></>}
            />


        </>
    )
};


/** This gets called on every request 
 * ---------------------------------
*/
export async function getStaticProps() {
  
    const res: any = await axios.get(apiUrls.RECEIVE_DEMO_LIST);
  
    // Pass data to the page via props
    return {
      props: { 
          currentData: res.data 
      },
  
      // Incremental Static Regeneration. (Next.js will attempt to re-generate the page:)
      revalidate: 10, // In seconds 
    }
  }
  
  export default Posts;
  