
export async function generateMetadata({ params }) {

    const id = params.id?.replace('.html', '');

    //
    const id2 = params.comment?.replace('.html', '');
    const currentData2 = id2.replace('.html', '');

    return {
        title: `${id}/${currentData2} - Nested Routes`,
        description: `${id}/${currentData2} - Nested Routes`
    }
}



export default function NestedRoutesChildChildLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: {
        id: string,
        comment: string
    }
}) {

    return <div className="app-nested-container--child">{children}</div>
}