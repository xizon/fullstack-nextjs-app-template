
export async function generateMetadata({ params }) {

    const { id: myId, comment: myComment } = await params;
    const id = myId.replace('.html', '');

    //
    const id2 = myComment.replace('.html', '');
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
    params: Promise<Record<string, string>>
}) {

    return <div className="app-nested-container--child">{children}</div>
}