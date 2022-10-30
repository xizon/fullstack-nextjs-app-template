import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const NestedRoutes = () => {

  return (
    <>
      <Head>
        <title>Nested Routes</title>
      </Head>


      <main>
        <div className="page">
          <Header />

          <section className="intro intro-subpage">
            <div className="container">
              <h2>Nested Routes</h2>
              <ul>
                <li>
                  <Link href="/nested-routes/first.html">
                  click here to display First
                  </Link>
                </li>
                <li>
                  <Link href="/nested-routes/second.html">
                    click here to display Second
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
};

export default NestedRoutes;
