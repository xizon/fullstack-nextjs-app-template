'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';

import Layout from '@/components/Layout';

import apiUrls from '@/config/apiUrls';
import axios from "axios";

import Cache from '@/utils/cache/cache-req';


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


const MainContent = (props) => {

    const [posts, setPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        // Get posts
        //-----
        const fetchPost = async () => {
            try {
                let response = await getList();
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
            <ul>

                {loading ? <>Loading...</> : posts.map((post: any) => {
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

export default function ClientPage(props) {

    return (
        <>
  
            <Layout
                pageTitle="Posts (with AJAX Cache)"
                contentComponent={<><MainContent {...props} /></>}
            />


        </>
    )
}

