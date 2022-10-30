# @/components/SocialMetadata

![MIT license](https://badgen.now.sh/badge/license/MIT)

[Source](https://github.com/xizon/fullstack-nextjs-app-template/tree/main/src/components/SocialMetadata)


## API

### Social Metadata
```js
import SocialMetadata from '@/components/SocialMetadata;
```
| Property\<Open Graph tag\> | Type | Default | Description |
| --- | --- | --- | --- |
| `ogTitle` | string  | - | Title or alternate title of page which displays as the headline |
| `ogDesc` | string  | - | Description of the page, of which Facebook displays 300 characters at most |
| `ogUrl` | string  | - | URL of page |
| `ogImage` | string  | - | URL of unique image, recommended dimensions 1200×630 pixels |



## Examples

```js
import React from 'react';
import SocialMetadata from '@/components/SocialMetadata';


export default () => {
  return (
    <>
      <SocialMetadata
        ogTitle="string"
        ogDesc="string"
        ogUrl="https://path"
        ogImage="https://xxx.png"
      />
    </>
  );
}

```

