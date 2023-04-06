/* 
 *************************************
 * <!-- Layout -->
 *************************************
 */
import { useEffect, useState, useMemo } from 'react';
import Loader from '@/components/Loader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import MultilevelDropdownMenu from '@/components/MultilevelDropdownMenu';

// store
import { useDispatch, useSelector } from "react-redux";
import getMenuData from "@/store/actions/demoMenuActions";



function PrimaryMenu(props: any) {
    return useMemo(() => {
        return <MultilevelDropdownMenu data={props.data} />
    }, [props]);
}


export default function Layout(props) {

    const [primaryMenuData, setPrimaryMenuData] = useState<any[]>([]);

    // Get store
    const [dispatchUpdate, setDispatchUpdate] = useState<boolean>(false);
    const dispatch = useDispatch();
    const storeData = useSelector((state: any) => {
        return state.menuData;
    });
    

    //
    useEffect(() => {

        // Get store
        //-----
        const fetchStoreMenu = async () => {
            if ( !dispatchUpdate ) {
                const res: any = await getMenuData(); // {type: 'RECEIVE_DEMO_MENU', payload: [...]}
                setDispatchUpdate(true);
                dispatch(res);
            }
        };

        fetchStoreMenu();
        setPrimaryMenuData(storeData.menuItems);

    }, [dispatchUpdate, dispatch]);


    return (
        <>

            <main>

                <Loader />

                {/*<!-- PAGE -->*/}
                <div className="page">
                    
                    <Header menu={<PrimaryMenu data={props.ssrNav ? props.ssrNav : primaryMenuData} />} />

                    
                    <section className={props.isHome ? `intro` : `intro intro-subpage`}>
                        <div className="container">
                            {props.isHome ? <h1>{props.pageTitle}</h1> : <h2>{props.pageTitle}</h2>}
                            {props.contentComponent}
                        </div>
                    </section>

                </div>
                {/*<!-- /PAGE -->*/}

                <Footer />

            </main>

            {/*<!-- BACK-TO-TOP -->*/}
            <BackToTop speed={700} easing="easeOut" />

        </>
    )
}

