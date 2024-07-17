import Link from 'next/link';



export async function generateStaticParams() {
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return [];
    } else {

        return [
            { id: `first.html` },
            { id: `second.html` }
        ];
    }
    
}


// using the `params` returned by `generateStaticParams`
// - /nested-routes/first.html
// - /nested-routes/second.html
// - ...
async function getServerSideProps(params) {

    const id = params.id;
    return id.replace('.html', '');
}


export default async function NestedRoutesChild({ params }) {

    const data = await getServerSideProps(params);

    return (
        <>

            {/** Title */}
            <h2>{data}</h2>

            {/** Content */}
            <ul>
                <li>
                    <Link href={`/nested-routes/${data}/first-comment.html`}>
                        First comment ({data})
                    </Link>
                </li>
                <li>
                    <Link href={`/nested-routes/${data}/second-comment.html`}>
                        Second comment ({data})
                    </Link>
                </li>
            </ul>


        </>
    )
}



