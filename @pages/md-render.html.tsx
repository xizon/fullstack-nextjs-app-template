import Head from 'next/head';
import Layout from '@/components/Layout';


// parse markdown
import fs from 'fs';
import path from 'path';
import markdownit from 'markdown-it';
const md = markdownit();

// github markdown styles
//@import https://github.com/sindresorhus/github-markdown-css


// ===================================
// Other Components
import MyButton from '@/components/Buttons';

const MainContent = (props) => {
    return (
        <>
            <MyButton btnName={'Other Components'} bgColor={'success'} />

            <hr />
            <article className="markdown-body">
                <div dangerouslySetInnerHTML={{ __html: props.mdxSource }} />
            </article>

        </>
    )

};


/** Render data
 * ---------------------------------
*/
const MarkdownRender = (props) => {

    return (
        <>
            <Head>
                <title>Markdown Render</title>
            </Head>


            <Layout
                pageTitle="Markdown Render"
                contentComponent={<><MainContent {...props} /></>}
            />


        </>
    )
};

export default MarkdownRender;


export async function getStaticProps() {

    const markdownContent = fs.readFileSync(
        path.join('public/docs', 'demo.md'),
        'utf-8'
    );

    const mdxSource = md.render(markdownContent);

    return {
        props: {
            mdxSource,
        },
    }
}