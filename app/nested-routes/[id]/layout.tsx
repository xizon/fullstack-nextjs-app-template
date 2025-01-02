import ClientLayout from "./ClientLayout";

export async function generateMetadata({ params }) {

    const { id: myID } = await params;
    const id = myID.replace('.html', '');
    const currentData = id.replace('.html', '');
    return {
        title: `${currentData} - Nested Routes`,
        description: `${currentData} - Nested Routes`
    }
}




export default function NestedRoutesChildLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: Promise<Record<string, string>>
}) {

    return <div className="app-nested-container"><ClientLayout params={params}>{children}</ClientLayout></div>
}