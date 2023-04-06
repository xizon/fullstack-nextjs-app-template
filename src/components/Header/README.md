# @/components/Header

![MIT license](https://badgen.now.sh/badge/license/MIT)

[Source](https://github.com/xizon/fullstack-nextjs-app-template/tree/main/src/components/Header)


## Examples

```js
import React from 'react';
import Header from '@/components/Header';

const PrimaryMenuComponent = (props) => {
    return(
        <>
            <ul><li>...</li></ul>
        </>
    )
};

export default () => {
    
  return (
    <>
		<Header menu={<PrimaryMenuComponent />} />
    </>
  );
}

```