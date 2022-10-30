import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';


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
			        <p>Out of nothing, something.</p>
              
            </div>
          </section>

        </div>


      </main>

      <Footer />

    </>
  )
};


export default About;
