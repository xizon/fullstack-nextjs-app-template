'use client'
import * as React from 'react'
import Layout from '@/components/Layout';

export default function ClientLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: Promise<Record<string, string>>
}) {
    
  // asynchronous access of `params.id`.
  const { id: myId } = (React as any).use(params);
    const id = myId.replace('.html', '');
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

