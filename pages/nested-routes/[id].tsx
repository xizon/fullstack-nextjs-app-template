import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';


/** Render data
 * ---------------------------------
*/
const NestedRoutesSub = () => {

  const router = useRouter();
  const id = router.query.id as string;
  const idShow = id.replace('.html', '')

  return (
    <>

      <Head>
         <title>{idShow}</title>
      </Head>


      <main>
        <div className="page">
          <Header />

          <section className="intro intro-subpage">
            <div className="container">

              <h2>Nested Routes: {idShow}</h2>
              <ul>
                <li>
                  <Link href={`/nested-routes/${idShow}/first-comment.html`}>
                    First comment
                  </Link>
                </li>
                <li>
                  <Link href={`/nested-routes/${idShow}/second-comment.html`}>
                     Second comment
                  </Link>
                </li>
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


export default NestedRoutesSub;
