import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';

import apiUrls from '@/config/apiUrls';
import axios from "axios";

import Cache from '@/utils/cache/cache-req';


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


/** Cache
 * ---------------------------------
*/
const todoGetList = () => {
    return new Promise((resolve, reject) => {
        axios.get(apiUrls.RECEIVE_DEMO_LIST).then((response) => {
            resolve(response)    
        });
    })
};

const getList = async () => {

    //
    const cacheData = Cache.memoize(todoGetList)();
    const [cacheName, cacheArgs] = cacheData.params;
    const res = await Cache.connect({
        autoClear: false,
        clearDelay: null,
        entry: 'getList'
    }, async () => {
        const data = await cacheData.fn(...cacheArgs);

        //############## return ###############
        return data;
        //############## /return ###############


    }, cacheName, cacheArgs);
    return res;


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

                // Object variant: paths must match the dynamic route shape.npm st
                const testSpecialStr = (s) => {
                    if (s.match(/\W/)) {
                        return true;    // Contains at least one special character or space
                    } else {
                        return false;
                    }
                };

                let res = await getList();
                setLoading(false);
                setPosts(res.data.filter(v => !testSpecialStr(v.name)));

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
