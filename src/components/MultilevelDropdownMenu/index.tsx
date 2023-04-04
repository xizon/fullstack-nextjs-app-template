/* 
 *************************************
 * <!-- Multiple-Level Dropdown Menu -->
 *************************************
 */
import { useId, memo } from 'react';

//
import MenuList from '@/components/MultilevelDropdownMenu/MenuList';


type MultilevelDropdownMenuProps = {
    /** Specify data of Cascading DropDown List as a JSON string format. 
     * Such as: `[{"heading":false,"title":"Top level 1",icon: "fa fa-window-restore","link":"#","children":[{"heading":false,"title":"Sub level 1","link":"#","children":[{"heading":false,"title":"Sub Sub Level 1","link":"#"}]}]},{"heading":false,"title":"Top level 2",icon: false,"link":"https://example.com"}]` */
    data?: any[any];
    /** -- */
    id?: string;
};


function MultilevelDropdownMenu(props: MultilevelDropdownMenuProps) {

    const {
        data,
        id
    } = props;

    const uniqueID = useId(); 


    return (
        <>

            <div id={id || uniqueID}>
                <MenuList menuListData={data} />
            </div>

        </>
    )

}

export default memo(MultilevelDropdownMenu);