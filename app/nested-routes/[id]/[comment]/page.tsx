import ClientPage from "./ClientPage";


export async function generateStaticParams() {
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return [];
    } else {

        return [
            { id: `first`, comment: `first-comment.html` },
            { id: `first`, comment: `second-comment.html` },
            { id: `second`, comment: `first-comment.html` },
            { id: `second`, comment: `second-comment.html` },
        ];
    }
    
}


// using the `params` returned by `generateStaticParams`
// - /nested-routes/first/first-comment.html',
// - /nested-routes/first/second-comment.html',
// - /nested-routes/second/first-comment.html',
// - /nested-routes/second/second-comment.html'

// - ...
async function getServerSideProps(params) {


    const id = params.id?.replace('.html', '');

    //
    const id2 = params.comment?.replace('.html', '');
    const currentData2 = id2.replace('.html', '');
    
    return [id, currentData2];


    
}


export default async function NestedRoutesChildChild({ params }) {

    const [data1, data2] = await getServerSideProps(params);

    return (
        <>
            <ClientPage currentData={`${data1}/${data2}`} />

        </>
    )
}



