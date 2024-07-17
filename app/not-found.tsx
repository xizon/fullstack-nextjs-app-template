import ClientPage404 from "./ClientPage404";


export async function generateMetadata({ params }) {
    
    return {
        title: '404',
    }
}


export default async function NotFound() {

    return (
        <>
            <ClientPage404  />

        </>
    )
}
