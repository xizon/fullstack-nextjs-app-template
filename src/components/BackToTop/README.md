# @/components/BackToTop

![MIT license](https://badgen.now.sh/badge/license/MIT)

[Source](https://github.com/xizon/fullstack-nextjs-app-template/tree/main/src/components/BackToTop)

## Version

=> 0.0.1 (October 10, 2021)

## API

### Back To Top
```js
import BackToTop from '@/components/BackToTop';
```
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `speed` | number  | 500| Speed of scrolling up. Amount of time measured in milliseconds. |
| `easing` | `linear` \| `easeIn` \| `easeOut` \| `easeInOut` | - | Types of easing animation |
| `btnIcon` | ReactNode  | - | Button Icon |

Scroll the page down to preview. The button is in the bottom right corner of the screen.




## Examples

```js
import React from 'react';
import BackToTop from '@/components/BackToTop';

export default () => {
  return (
    <>

      <BackToTop speed={700} easing="easeOut" btnIcon={<><i className="fa fa-arrow-up" aria-hidden="true"></i></>} />

    </>
  );
}

```