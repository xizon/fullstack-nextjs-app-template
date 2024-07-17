import ClientPage from "./ClientPage";


export async function generateMetadata({ params }) {
    
    return {
        title: 'About',
    }
}


export default async function About() {

    return (
        <>
            <ClientPage  />

        </>
    )
}
