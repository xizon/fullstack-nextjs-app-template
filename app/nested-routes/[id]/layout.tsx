import ClientLayout from "./ClientLayout";

export async function generateMetadata({ params }) {

    const id = params.id?.replace('.html', '');
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
    params: {
        id: string
    }
}) {

    return <div className="app-nested-container"><ClientLayout params={params}>{children}</ClientLayout></div>
}