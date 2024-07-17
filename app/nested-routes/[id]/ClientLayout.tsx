'use client'

import Layout from '@/components/Layout';

export default function ClientLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: {
        id: string
    }
}) {
    
  
    const id = params.id?.replace('.html', '');
    const currentData = id.replace('.html', '');

    return (
        <>
   
            <Layout
                pageTitle={null}
                contentComponent={<>{children}</>}
            />

        </>
    )
}

