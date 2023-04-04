import axios from 'axios';
import apiUrls from '@/config/apiUrls';

const actionCreators = async () => {

    const res = await axios.get(apiUrls.MENU);

    const action = {
        type: 'RECEIVE_DEMO_MENU',
        payload: res.data.data
    }

    return action;
}

export default actionCreators;

