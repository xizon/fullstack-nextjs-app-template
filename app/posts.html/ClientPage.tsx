'use client'


import Link from 'next/link';
import Layout from '@/components/Layout';

const MainContent = (props) => {
    return (
        <>
            <ul>

                {!props.data ? <>Loading...</> : props.data.map((post: any) => {
                    return (
                        <li key={post.name}>
                            <Link href={`/posts/${post.name}.html`} dangerouslySetInnerHTML={{ __html: `${post.name} - (region: ${post.region})` }}></Link>


                        </li>
                    );
                })}
            </ul>

        </>
    )

};

export default function ClientPage(props) {

    return (
        <>

            <Layout
                pageTitle="Posts"
                contentComponent={<><MainContent data={props.list} /></>}
            />



        </>
    )
}

