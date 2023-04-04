# @/components/Header

![MIT license](https://badgen.now.sh/badge/license/MIT)

[Source](https://github.com/xizon/fullstack-nextjs-app-template/tree/main/src/components/Header)


## Examples

```js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';

const PrimaryMenuComponent = (props) => {
    return(
        <>
            <ul><li>...</li></ul>
        </>
    )
};

export default () => {
    
     const router = useRouter();
     const [loading, setLoading] = useState<boolean>(false);

     useEffect(() => {
 
         const handleStart = (url) => (url !== router.asPath) && setLoading(true);
         const handleComplete = (url) => (url === router.asPath) && setTimeout(() => { setLoading(false) }, 2000);
 
         router.events.on('routeChangeStart', handleStart)
         router.events.on('routeChangeComplete', handleComplete)
         router.events.on('routeChangeError', handleComplete)
 
         return () => {
             router.events.off('routeChangeStart', handleStart)
             router.events.off('routeChangeComplete', handleComplete)
             router.events.off('routeChangeError', handleComplete)
         }
     });
 

  return (
    <>
		<Header loading={loading} menu={<PrimaryMenuComponent />} />
    </>
  );
}

```