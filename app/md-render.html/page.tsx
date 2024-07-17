import ClientPage from "./ClientPage";


// parse markdown
import fs from 'fs';
import path from 'path';
import markdownit from 'markdown-it';
const md = markdownit();

// github markdown styles
//@import https://github.com/sindresorhus/github-markdown-css


export async function generateMetadata({ params }) {
    
    return {
        title: 'Markdown Render',
    }
}


export default async function MarkdownRender() {

    const markdownContent = fs.readFileSync(
        path.join('public/docs', 'demo.md'),
        'utf-8'
    );

    const mdxSource = md.render(markdownContent);


    return (
        <>
            <ClientPage mdxSource={mdxSource}  />

        </>
    )
}
