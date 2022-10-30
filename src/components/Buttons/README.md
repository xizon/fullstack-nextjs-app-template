# @/components/Buttons

![MIT license](https://badgen.now.sh/badge/license/MIT)

[Source](https://github.com/xizon/fullstack-nextjs-app-template/tree/main/src/components/Buttons)


## API

### Buttons
```js
import Button from '@/components/Buttons';
```
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `href` | string | - | Providing a href will render an \<a\> element. Otherwise, it will be a \<button\> element |
| `bgColor` | string  | - | Background color of button. |
| `btnName` | string \| React.ReactNode  | - | The currently selected page number.  |

It accepts all props(include data-* attributes) which native buttons support.


## Examples

```js
import React from 'react';
import Button from '@/components/Buttons';

let spreadOperator = {
  bgColor: 'info',
  btnName: 'Spread Operator',
};


export default () => {
  return (
    <>
		<Button bgColor='' btnName='' href=''/>
		<Button bgColor='success' btnName='success'/>
		<Button bgColor='info' btnName='info'/>
		<Button bgColor='danger' btnName='danger'/>
		<Button bgColor='warning' btnName='warning'/>
		<Button {...spreadOperator}/>
    </>
  );
}

```