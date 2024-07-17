import ClientPage from "./ClientPage";


export async function generateMetadata({ params }) {
    
    return {
        title: 'Posts (with AJAX Cache)',
    }
}


export default async function PostsAjaxCache() {

    return (
        <>
            <ClientPage  />

        </>
    )
}
