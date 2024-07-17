'use client'


import Layout from '@/components/Layout';

const MainContent = (props) => {

    return (
        <>
            <div key={props.data.name}>
                <img style={{ width: '220px', height: '150px' }} src={props.data.flag} />
                <br />
                <sub><strong>New path:</strong> {props.data.flag}</sub>
            </div>
        </>
    )

};



export default function ClientPage({ currentData }) {

    // no date
    //---------
    if ( currentData === null) return null;

    //
    //---------    
    return (
        <>
     
            <Layout
                pageTitle={`${currentData.name}`}
                contentComponent={<><MainContent data={currentData}/></>}
            />

        </>
    )
}

