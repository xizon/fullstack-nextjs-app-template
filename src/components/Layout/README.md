# @/components/Layout

![MIT license](https://badgen.now.sh/badge/license/MIT)

[Source](https://github.com/xizon/fullstack-nextjs-app-template/tree/main/src/components/Layout)


## Examples

```js
import React from 'react';
import Layout from '@/components/Layout';


const MainContent = () => {
    return (
        <>
            <p>
                Text here...
            </p>

        </>
    )

};

export default () => {
  return (
    <>
        <Layout
            isHome={true}
            pageTitle="Page Title Here"
            nav={JSON.stringify([...])}
            contentComponent={<><MainContent /></>}
        />
    </>
  );
}

```