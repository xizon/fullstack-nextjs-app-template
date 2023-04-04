# @/components/Modal

![MIT license](https://badgen.now.sh/badge/license/MIT)

[Source](https://github.com/xizon/fullstack-nextjs-app-template/tree/main/src/components/Modal)

## API

### Modal
```js
import Modal from '@/components/Modal';
```
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `modalId` | number  | - | <strong>(Required)</strong> The modal ID. |
| `targetId` | number  | - | <strong>(Required)</strong> ID parameter to send request. |
| `show` | boolean  | false | Whether to display the window by default. |
| `title` | string \| React.ReactNode  | - | Trigger text of the window |
| `content` | string \| React.ReactNode  | - | The content of the window displayed |
| `showClickEvent` | function | - | Opening the window is the triggered event |
| `closeClickEvent` | function | - | Closing the window is the triggered event |
| `gotoIdClickEvent` | function | - | The method to call when a page is clicked. Exposes the current ID as an argument. |



## Examples

```js
import React, { useState } from 'react';
import axios from 'axios';
import DashboardModal from '@/components/DashboardModal';


export default () => {

    const [winstate, setWinstate] = useState(false);
    const [datalist, setDataList] = useState([]);


    async function getAll() {
        let response = await axios.get(`https://restcountries.com/v2/all`);
        const res = response.data;
        let _data = res.map((item) => {
            return (
                <li key={item.id}>
                   {item.name}
                </li>
            );
        })
        setWinstate(true);
        setDataList(<><ul>{_data}</ul></>);
    }

    function handleDetail() {
        //`id` comes from the public parameter thrown by the component `<DashboardModal />`
        console.log( 'id: ', id );

        // other actions
        // ...
    }


  return (
    <>


        <DashboardModal
            show={winstate}
            modalId={"modal-1"}
            targetId={1}
            title={<>🔥Click Here (Hyperlink, or anything)</>}
            content={datalist}
            gotoIdClickEvent={handleDetail}
            showClickEvent={() => {
                console.log('show windw');
                getAll();
            }}
            closeClickEvent={() => {
                console.log('hide windw');
                setWinstate(false);
            }}
        />

    </>
  );
}

```