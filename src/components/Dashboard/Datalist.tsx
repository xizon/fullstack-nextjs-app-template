import { useEffect, useState, useCallback } from 'react';
import CRUDService from "@/utils/data-service/crud";

import Modal from '@/components/Modal';


function detailTable(
    id: React.ReactNode | string = '',
    name: React.ReactNode | string = '',
    email: React.ReactNode | string = '',
    avatar: React.ReactNode | string = ''
) {

    return (
        <table>
            <tbody>
                <tr style={{ display: id != '' ? 'table-row' : 'none' }}>
                    <td width="138" align="right">
                        <strong>ID: </strong>
                    </td>
                    <td>
                        {id}
                    </td>
                </tr>
                <tr>
                    <td width="138" align="right">
                        <strong>Name: </strong>
                    </td>
                    <td>
                        {name}
                    </td>
                </tr>
                <tr>
                    <td width="138" align="right">
                        <strong>Email: </strong>
                    </td>
                    <td>
                        {email}
                    </td>
                </tr>
                <tr>
                    <td width="138" align="right">
                        <strong>Avatar: </strong>
                    </td>
                    <td>
                        {avatar}
                    </td>
                </tr>
            </tbody>
        </table>
    );
}


const DataList = () => {

    const [datalist, setDataList] = useState<any[]>([]);

    // detail container
    const [detail, setDetail] = useState<any>({
        display: false,
        content: 'loading...'
    });    

    // form
    const [formAdd, setFormAdd] = useState<any>({
        display: false,
        content: 'loading...'
    });    
    const [formEdit, setFormEdit] = useState<any>({
        display: false,
        content: 'loading...',
        fieldName: '',
        fieldEmail: '',
        fieldAvatar: '',
    });



    /**
     * Get all data
     * ------------------
     */
    async function getAll() {
        let response: any = await CRUDService.getAll();
        setDataList(response.data.data);
    }

    /**
    * Get data from ID
    * ------------------
    */
    async function get(id) {
        let response: any = await CRUDService.get(id);
        const _data = response.data.data;
        setDetail({
            display: !detail.display,
            content: detailTable(_data.id, _data.name, _data.email, <><img src={_data.avatar} width="100" /></>)
        });
    }

    const handleDetail = useCallback(
        (id) => (e) => {
            e.preventDefault();

            console.log('detail id: ', id);
            get(id);

        }, []);



    /**
    * Create a new data
    * ------------------
    */
    function handleAddForm(e) {
        e.preventDefault();

        const formCode = (
            <form tabIndex={-1} method="post" style={{ padding: "20px" }}>
                {detailTable(
                    false,
                    <><input type="text" size={20} name="name" /></>,
                    <><input type="text" size={20} name="email" /></>,
                    <><input type="text" size={35} name="avatar" placeholder="http://" /></>
                )}
                <input style={{ padding: "5px 15px", background: "rgb(57 57 57)", outline: "none", color: "#fff", borderRadius: "30px", border: "none", fontSize: "12px", marginLeft: "142px" }} type="button" value="Submit" onClick={handleSubmit('add')} />
            </form>
        );

        setFormAdd({
            display: true,
            content: formCode
        });

    }


    /**
    * Update data from ID
    * ------------------
    */
    async function getUpdateId(id) {
        let response: any = await CRUDService.get(id);
        const _data = response.data.data;

        const formCode = (
            <form tabIndex={-1} style={{ padding: "20px" }}>
                {detailTable(
                    false,
                    <><input type="text" size={20} name="name" defaultValue={_data.name} /></>,
                    <><input type="email" size={20} name="email" defaultValue={_data.email} /></>,
                    <><input type="text" size={35} name="avatar" placeholder="http://" defaultValue={_data.avatar} /></>
                )}
                <input style={{ padding: "5px 15px", background: "rgb(57 57 57)", outline: "none", color: "#fff", borderRadius: "30px", border: "none", fontSize: "12px", marginLeft: "142px" }} type="button" value="Update" onClick={handleSubmit('edit', id)} />
            </form>
        );

        setFormEdit({
            display: !formEdit.display,
            content: formCode,
            fieldName: _data.name,
            fieldEmail: _data.email,
            fieldAvatar: _data.avatar
        });

    }

    const handleEditForm = useCallback(
        (id) => (e) => {
            e.preventDefault();

            console.log('update id: ', id);
            getUpdateId(id);

        }, []);


    /**
    * Remove data from ID
    * ------------------
    */
    async function remove(id) {

        let response: any = await CRUDService.remove(id);
        if (response.data.code === 200) {
            //refresh list
            getAll();
        }
    }

    function handleDelete(id) {
        //`id` comes from the public parameter thrown by the component `<Modal />`
        console.log('delete id: ', id);

        //
        remove(id);
    }


    /**
    * Create or Update form data
    * ------------------
    */

    const handleSubmit = useCallback(
        (type, id = '') => (e) => {
            e.preventDefault();


            const root = e.target.closest('form');
            const $inputs = Array.prototype.slice.call(root.querySelectorAll('input'));
            const serializeObj = {};

            //data for each input
            $inputs.forEach((node) => {
                if (node.type !== "button") {
                    serializeObj[node.name] = node.value as never;
                }
            });


            //control status
            $inputs.forEach((node) => {
                node.disabled = true;
            });


            //
            const formData = new FormData();
            const defaultPostData = {
                action: type === 'add' ? 'add_new_post' : 'add_edit_post',
                ...serializeObj
            };

            console.log('formData: ', defaultPostData);

            for (let k in defaultPostData) {
                formData.append(k, defaultPostData[k]);
            }

            //
            const refreshList = () => {
                //control status
                $inputs.forEach((node) => {
                    node.value = '';
                    node.disabled = false;
                });


                //refresh list
                getAll();
            };

            if (type === 'add') {
                CRUDService.create(formData).then((response) => {
                    if (response.data.code === 200) {
                        // close window
                        setFormAdd({
                            display: false
                        });
                        refreshList();
                    }
                });
            }
            if (type === 'edit') {
                CRUDService.update(id, formData).then((response) => {
                    if (response.data.code === 200) {
                        // close window
                        setFormEdit({
                            display: false
                        });
                        refreshList();
                    }
                });
            }



        }, []);



    useEffect(() => {
        getAll();
    }, []); 


    return (
        <>

            <h4>Data &nbsp;&nbsp;&nbsp;&nbsp;<a style={{ padding: "7px 25px", background: "#191919", outline: "none", color: "#fff", borderRadius: "30px", border: "none", fontSize: "14px", textDecoration: "none" }} href="#" onClick={handleAddForm}>Add New</a></h4>

            <hr />

            <ul>
                {!datalist ? <>Loading...</> : datalist.map((item: any) => {
                    return (
                        <li key={item.id}>
                            <a href="#" onClick={handleDetail(item.id)}>({item.id}) {item.name} - {item.email}</a>


                            <div style={{ float: "right" }}>

                                {/* ------- Edit Button -------- */}
                                <a href="#" onClick={handleEditForm(item.id)}><svg version="1.1" height="15" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
                                    <g><path d="M470.1,744.4L277.9,552.2L797.8,32.3L990,224.5L470.1,744.4z M345.9,552.2l124.3,124.3l452-452L797.8,100.2L345.9,552.2z" /><path d="M238.6,576l207.6,207.6l-222.4,14.8L238.6,576z" /><path d="M889.6,967.7H10V75h524.4v48H58v796.6h783.6V521.4h48V967.7z" /></g>
                                </svg></a>&nbsp;&nbsp;


                                {/* ------- Delete Button -------- */}
                                <Modal
                                    modalId={"modal-del-" + item.id}
                                    targetId={item.id}
                                    title={<><svg height="15" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enableBackground="new 0 0 1000 1000" xmlSpace="preserve">
                                        <g><path d="M653.1,867.5c16.8,0,30.6-13.8,30.6-30.6V469.4c0-16.8-13.8-30.6-30.6-30.6c-16.8,0-30.6,13.8-30.6,30.6v367.5C622.5,853.7,636.3,867.5,653.1,867.5z M346.9,867.5c16.8,0,30.6-13.8,30.6-30.6V469.4c0-16.8-13.8-30.6-30.6-30.6s-30.6,13.8-30.6,30.6v367.5C316.3,853.7,330,867.5,346.9,867.5z M836.9,132.5H653.1V71.3c0-33.7-27.6-61.3-61.3-61.3H408.1c-33.7,0-61.3,27.6-61.3,61.3v61.3H163.1c-33.7,0-61.3,27.6-61.3,61.3V255c0,33.7,27.6,61.3,61.3,61.3v551.3c0,67.4,55.1,122.5,122.5,122.5h428.8c67.4,0,122.5-55.1,122.5-122.5V316.3c33.7,0,61.3-27.6,61.3-61.3v-61.2C898.1,160.1,870.6,132.5,836.9,132.5z M408.1,101.9c0-16.8,13.8-30.6,30.6-30.6h122.5c16.8,0,30.6,13.8,30.6,30.6v30.6c-29.9,0-183.8,0-183.8,0V101.9z M775.6,867.5c0,33.7-27.6,61.3-61.3,61.3H285.6c-33.7,0-61.3-27.6-61.3-61.3V316.3h551.3V867.5z M806.3,255H193.8c-16.8,0-30.6-13.8-30.6-30.6s13.8-30.6,30.6-30.6h612.5c16.8,0,30.6,13.8,30.6,30.6S823.1,255,806.3,255z M500,867.5c16.8,0,30.6-13.8,30.6-30.6V469.4c0-16.8-13.8-30.6-30.6-30.6s-30.6,13.8-30.6,30.6v367.5C469.4,853.7,483.2,867.5,500,867.5z" /></g>
                                    </svg></>}
                                    content={<>
                                        <p>
                                            You will delete this post via ID {item.id}. <br />
                                            <a href="#" onClick={(e) => {
                                                e.preventDefault();
                                                handleDelete(item.id);
                                            }}>Are you sure?</a>

                                        </p>
                                    </>}
                                    showClickEvent={() => {
                                        const _modal = (document.querySelector('#modal-del-' + item.id)) as HTMLElement;
                                        _modal.style.display = 'flex';

                                    }}
                                    closeClickEvent={() => {
                                        const _modal = (document.querySelector('#modal-del-' + item.id)) as HTMLElement;
                                        _modal.style.display = 'none';
                                    }}
                                />
                            </div>

                        </li>
                    );
                })}
            </ul >


            {/* ------- Detail container -------- */}
            <Modal
                show={detail.display}
                modalId={"modal-detail-container"}
                targetId={9997}
                title={null}
                content={detail.content}
                closeClickEvent={() => {
                    setDetail({
                        display: false
                    });
                }}
            />

            {/* ------- Form(add) -------- */}
            <Modal
                show={formAdd.display}
                modalId={"modal-form-add-container"}
                targetId={9998}
                title={null}
                content={formAdd.content}
                closeClickEvent={() => {
                    setFormAdd({
                        display: false
                    });
                }}
            />


            {/* ------- Form(efit) -------- */}
            <Modal
                show={formEdit.display}
                modalId={"modal-form-edit-container"}
                targetId={9999}
                title={null}
                content={formEdit.content}
                closeClickEvent={() => {
                    setFormEdit({
                        display: false
                    });
                }}
            />

        </>
    )
};


export default DataList;



