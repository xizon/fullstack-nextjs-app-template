# @/components/MultilevelDropdownMenu

![MIT license](https://badgen.now.sh/badge/license/MIT)

[Source](https://github.com/xizon/fullstack-nextjs-app-template/tree/main/src/components/MultilevelDropdownMenu)


## Version

=> 0.0.2 (April 3, 2023)

## API

### Multiple-Level Dropdown Menu
```js
import MultilevelDropdownMenu from '@/components/MultilevelDropdownMenu';
```
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | array | - | Specify data of Cascading DropDown List as a JSON string format. Such as: <br />`[{"heading":false,"title":"Top level 1",icon: "fa fa-window-restore","link":"#","children":[{"heading":false,"title":"Sub level 1","link":"#","children":[{"heading":false,"title":"Sub Sub Level 1","link":"#"}]}]},{"heading":false,"title":"Top level 2",icon: false,"link":"https://example.com"}]` |


Array configuration properties of the `data`:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `heading` | boolean | - | Make a plain text (usually used as a separator) |
| `icon` | boolean \| string | - | Specify a class name of a font icon |
| `title` | string | - | The title attribute is used to provide the label text of the hyperlink |
| `link` | string | - | Specify a URL address. (it may be route driven) |
| `children` | array | - | Specify a set of sub-navigation, the key value of each item still uses `title` and `link` Eg. `[{"title":"Sub Sub Level 1","link":"#"},{"title":"Sub Sub Level 2","link":"#"}]` |




## Examples

```js
import React from 'react';
import MultilevelDropdownMenu from '@/components/MultilevelDropdownMenu';

const menuListData = [{
    heading: false,
    icon: "fa fa-window-restore",
	title: "Top level 1",
	link: "#",
	children: [
		{
			title: "Sub level 1_1",
			link: "#",
			children: [{
				title: "Sub Sub Level 1_1",
				link: "#",
				children: [{
					title: "Sub Sub Sub Level 1_1",
					link: "#"
				}]
			}]
		},
		{
			title: "Sub level 1_2",
			link: "#"
		}]
},
{
	title: "Top level 2",
    icon: false,
	link: "https://example.com"
},
{
	title: "Top level 3",
	link: "https://www.bing.com",
	children: [
		{
			title: "Sub level 3_1",
			link: "#"
		},
		{
			title: "Sub level 3_2",
			link: "#"
		},
		{
			title: "Sub level 3_3",
			link: "#"
		}]
},
{
	title: "Top level 4",
	link: "#",
	children: [
		{
			title: "Sub level 4_1",
			link: "#"
		},
		{
			title: "Sub level 4_2",
			link: "#"
		}]
},
{
	title: "Top level 5",
	link: "#"
},
{
	title: "Top level 6",
	link: "#"
}
];

export default () => {
  return (
    <>

      <MultilevelDropdownMenu data={menuListData} />

    </>
  );
}

```