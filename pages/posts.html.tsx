import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import apiUrls from '@/config/apiUrls';
import axios from "axios";


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


      <main>
        <div className="page">
          <Header />


          <section className="intro intro-subpage">
            <div className="container">
              <h2>Posts</h2>
              <ul>

                {!posts ? <>Loading...</> : posts.map((post: any) => {
                  return (
                    <li key={post.name}>
                      <Link href={`/posts/${post.name}.html`} dangerouslySetInnerHTML={{__html: `${post.name} - (region: ${post.region})` }}></Link>

                      
                    </li>
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
}


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
