/**
 * Data fetching with Redux and HTTP requests
 * 
 * @usage:

const myActions = async () => {
    const action = {
        type: 'LOADER_FULLSCREEN'
    }    
    return action;
}

const App = () => {
    const [storeData, fetchStore] = useFetchData(myActions);
    // const [storeData, fetchStore] = useFetchData([myActions1, myActions2]);
    // const [storeData] = useFetchData();

    const getStoreData = () => {
        const _data = storeData.xxxxxx;
        if (_data === null) {
            return null;
        } else {
            return _data;
        }
    };

    useEffect(() => {

        // Get store
        //-----
        if (getStoreData() === null) {
            if (typeof fetchStore === 'function') fetchStore();
        } else {
            // do something
        }

    }, [storeData]);
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

    const fetchStore = async () => {

        if (Array.isArray(actions)) {

            const allActions = actions.map((action) => action());
            Promise.all(allActions).then((values) => {
                values.forEach((val) => {
                    dispatch(val);
                });
            });
            
        } else {
            const res = await actions(); // {type: 'RECEIVE_MENU', payload: [...]}
            dispatch(res);
        }

    };

    return [storeData, fetchStore];
}


export default useFetchData;

