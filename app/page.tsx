import ClientPage from "./ClientPage";


// store
import { store } from "@/store/createStore";
import getMenuData from "@/store/actions/demoMenuActions";



async function getServerSideProps() {
    const action = await getMenuData(); // {type: 'RECEIVE_DEMO_MENU', payload: [...]}
    store.dispatch(action);
    const res = store.getState();
    return res.menuData.menuItems;
}

export default async function Home() {

    const data = await getServerSideProps();
    return (
        <>
            <ClientPage list={data} />

        </>
    )
}

