'use client'


import Layout from '@/components/Layout';


// ===================================
// Other Components
import MyButton from '@/components/Buttons';



const MainContent = (props) => {
    return (
        <>
            <MyButton bgColor={'success'}>Other Components</MyButton>
            

            <hr />
            <article className="markdown-body">
                <div dangerouslySetInnerHTML={{ __html: props.mdxSource }} />
            </article>

        </>
    )

};

export default function ClientPage(props) {

    return (
        <>

            <Layout
                pageTitle="Markdown Render"
                contentComponent={<><MainContent {...props} /></>}
            />


        </>
    )
}

