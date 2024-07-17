import ClientPage from "./ClientPage";


export async function generateMetadata({ params }) {
    
    return {
        title: 'Sign In',
    }
}


export default async function SignIn() {

    return (
        <>
            <ClientPage  />

        </>
    )
}
