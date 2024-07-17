/* 
 *************************************
 * <!-- Layout -->
 *************************************
 */
import { useEffect, useState, useMemo } from 'react';
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

    const {
        ssrNav,
        isHome,
        pageTitle,
        contentComponent
    } = props;

    const [primaryMenuData, setPrimaryMenuData] = useState<any[]>([]);

    // Get store
    const [dispatchUpdate, setDispatchUpdate] = useState<boolean>(false);
    const dispatch = useDispatch();
    const storeData = useSelector((state: any) => {
        return state.menuData.menuItems;
    });


    //
    useEffect(() => {

        // Get store
        //-----
        const fetchStore = async () => {
            if (!dispatchUpdate) {

                // Support for using multiple actions
                Promise.all([
                    getMenuData(), // {type: 'RECEIVE_DEMO_MENU', payload: [...]}
                ]).then((values) => {
                    const resMenu = values[0];

                    setDispatchUpdate(true);
                    dispatch(resMenu);
                });

            }
        };

        if (storeData === null) {
            fetchStore();
        } else {

            let menuAll = storeData;

            //update menu data
            //-----   
            setPrimaryMenuData(menuAll);
        }

    }, [dispatchUpdate, dispatch]);


    return (
        <>

            <main>

                {/*<!-- PAGE -->*/}
                <div className="page">

                    <Header menu={<PrimaryMenu data={ssrNav ? ssrNav : primaryMenuData} />} />


                    <section className={isHome ? `intro` : `intro intro-subpage`}>
                        <div className="container">
                            {pageTitle === null ? null : <>{isHome ? <h1>{pageTitle}</h1> : <h2>{pageTitle}</h2>}</>}
                            {contentComponent}
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

