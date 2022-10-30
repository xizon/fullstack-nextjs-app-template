import type { NextPage } from 'next';
import Head from 'next/head';
import Button from '@/components/Buttons';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialMetadata from '@/components/SocialMetadata';


import SvgIcon from "../public//assets/images/icon.svg";
import CRUDService from "@/utils/dataservice-crud.js";
import { useEffect } from 'react';

type Props = { 
  protocol: string | null;
  host: string | null;
  path: string | null;
};

const Home: NextPage<Props> = () => {

  useEffect(() => {

    // init php data
    CRUDService.initData();

  }, []); // Empty array ensures that effect is only run on mount and unmount
  return (
    <>

      <Head>
        <title>HomePage</title>
        <meta name="description" content="A whole-website building solution based on Next.js. It serves as a case to sort out the thinking." />

        <SocialMetadata
          ogTitle="HomePage"
          ogDesc="A whole-website building solution based on Next.js. It serves as a case to sort out the thinking."
          ogUrl="/"
          ogImage="/assets/images/logo-black.png"
        />  
      </Head>

      <main>
        <div className="page">
          <Header />

          <section className="intro">
            <div>
              <h1>HomePage</h1>
              <p>
                A website-building solution based on Next.js. It serves as a case to sort out the thinking.
              </p>
              <p className="buttons">
              <Button bgColor='' btnName={<><SvgIcon width="15" style={{verticalAlign: 'text-top', marginRight: '10px'}} fill="#0576a0"/>About US</>} href="/about.html" />
              </p>
            </div>
          </section>
          
        </div>

      </main>

      <Footer />
    </>
  )
}

export default Home;
