import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Error404 = () => {

  return (
    <>
      <Head>
        <title>404</title>
      </Head>


      <main>
        <div className="page">
          <Header />

          <section className="intro intro-subpage">
            <div className="container">
              <h2>404</h2> 
			        <p>That page has gone missing.</p>
            </div>
          </section>

        </div>


      </main>

      <Footer />

    </>
  )
};

export default Error404;
