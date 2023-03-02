import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


// Dynamically import components
// Delay loading components to improve performance
import dynamic from 'next/dynamic';
const MyButton = dynamic(() => import('@/components/Buttons'), { ssr: false });




/** Render data
 * ---------------------------------
*/
const About = () => {

  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="Out of nothing, something." /> 
      </Head>


      <main>
        <div className="page">
          <Header />

          <section className="intro intro-subpage">
            <div className="container">
              <h2>About</h2> 
              <p>This is a dynamically imported button, which will delay loading to improve performance.</p>
              <MyButton btnName={'Submit'} bgColor={'success'} />
              
            </div>
          </section>

        </div>


      </main>

      <Footer />

    </>
  )
};


export default About;
