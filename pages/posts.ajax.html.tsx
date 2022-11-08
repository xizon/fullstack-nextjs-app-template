import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import apiUrls from '@/config/apiUrls';
import axios from "axios";
import { useEffect, useState } from 'react';

const Posts = () => {

  const [posts, setPosts] = useState<any[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {

    const fetchPost = async () => {
      try {
         let response = await axios.get( apiUrls.RECEIVE_DEMO_LIST );
         setLoaded(true);
         setPosts(response.data);
         
      } catch (error) {
         console.log(error);
      }
   };
   fetchPost();

 }, []); // Empty array ensures that effect is only run on mount and unmount

  return (
    <>
      <Head>
        <title>Posts</title>
      </Head>


      <main>
        <div className="page">
          <Header />


          <section className="intro intro-subpage">
            <div className="container">
              <h2>Posts</h2>
              <ul>

              {!loaded ? <>Loading...</> : posts.map((post: any) => {
                return (
                    <li key={post.name} dangerouslySetInnerHTML={{__html: `${post.name} - (region: ${post.region})` }}></li>
                );
              })}
              </ul>
            </div>
          </section>

        </div>


      </main>

      <Footer />

    </>
  )
};

export default Posts;
