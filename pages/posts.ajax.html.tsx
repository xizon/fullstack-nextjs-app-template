import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

import apiUrls from '@/config/apiUrls';
import axios from "axios";


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

    }, []); 

    return (
        <>
            <Head>
                <title>Posts</title>
            </Head>


            <Layout
                pageTitle="Posts"
                contentComponent={<><MainContent data={posts} loading={loading}/></>}
            />


        </>
    )
};


export default Posts;
