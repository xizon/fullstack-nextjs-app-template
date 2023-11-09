/**
 * Data fetching with Redux and HTTP requests
 * 
 * @usage:

const myActions = async () => {
    const action = {
        type: 'ACTION_TYPE_1'
    }    
    return action;
}

const myActions1 = async () => {
    const action = {
        type: 'ACTION_TYPE_2'
    }    
    return action;
}


const myActions2 = async () => {
    const action = {
        type: 'ACTION_TYPE_3'
    }    
    return action;
}

const myActions3 = async (myparam) => {
    const action = {
        type: 'ACTION_TYPE_4',
        payload: myparam
    }    
    return action;
}


const App = () => {
    const [storeData, fetchStore] = useFetchData(myActions);
    // const [demo1StoreData, fetchDemo1Store] = useFetchData([myActions1, myActions2]);
    // const [demo2StoreData, fetchDemo2Store] = useFetchData(myActions3);
    // const [demo3StoreData] = useFetchData();

    const getStoreData = () => {
        const _data = storeData.xxxxxx;
        if (_data === null) {
            return null;
        } else {
            return _data;
        }
    };

    const updateDemo2 = () => {
        fetchDemo2Store('string here');
    };

    useEffect(() => {

        // Get store
        //-----
        if (getStoreData() === null) {
            if (typeof fetchStore === 'function') fetchStore();
        } else {
            // do something
        }

    }, [storeData]); // You can also remove dependencies and write `useEffect(() => { ... }, [])`
};

 */

// store
import { useDispatch, useSelector } from "react-redux";

function useFetchData(actions) {

    // Get store
    const dispatch = useDispatch();
    const storeData = useSelector((state) => {
        return state;
    });

    // Get store
    if ( typeof actions === 'undefined' ) return [storeData];

    const fetchStore = async (...rest) => {

        if (Array.isArray(actions)) {

            const allActions = actions.map((action) => action(...rest));
            Promise.all(allActions).then((values) => {
                values.forEach((val) => {
                    dispatch(val);
                });
            });
            
        } else {
            const res = await actions(...rest); // {type: 'RECEIVE_MENU', payload: [...]}
            dispatch(res);
        }

    };

    return [storeData, fetchStore];
}


export default useFetchData;

