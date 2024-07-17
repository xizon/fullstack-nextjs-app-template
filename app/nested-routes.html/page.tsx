import ClientPage from "./ClientPage";


export async function generateMetadata({ params }) {
    
    return {
        title: 'Nested Routes',
    }
}


export default async function NestedRoutes() {

    return (
        <>
            <ClientPage  />

        </>
    )
}
