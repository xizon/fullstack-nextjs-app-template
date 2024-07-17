'use client'


import Layout from '@/components/Layout';


const MainContent = () => {
    return (
        <>
            <p>Sub page here.</p>
   
        </>
    )

};

export default function ClientPage(props) {

    return (
        <>
  
            <Layout
                pageTitle="About"
                contentComponent={<><MainContent /></>}
            />


        </>
    )
}

