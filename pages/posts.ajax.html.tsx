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

                {props.loading ? <>Loading...</> : props.data.map((post: any) => {
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
const Posts = () => {


    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Get store
    const [dispatchUpdate, setDispatchUpdate] = useState<boolean>(false);
    const dispatch = useDispatch();
    const storeData = useSelector((state: any) => {
        return state.menuData;
    });


    useEffect(() => {

        // Get posts
        //-----
        const fetchPost = async () => {
            try {
                let response = await axios.get(apiUrls.RECEIVE_DEMO_LIST);
                setLoading(false);
                setPosts(response.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchPost();

        // Get store
        //-----
        const fetchStoreMenu = async () => {
            if (!dispatchUpdate) {
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
                contentComponent={<><MainContent data={posts} loading={loading}/></>}
            />


        </>
    )
};


export default Posts;
