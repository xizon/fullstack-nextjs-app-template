import axios from 'axios';
import apiUrls from '@/config/apiUrls';

const actionCreators = async () => {

    // axios requires absolute URLs in server-side (Node.js) context; relative URLs only work in the browser
    let menuUrl = apiUrls.MENU;
    if (typeof window === 'undefined' && menuUrl.startsWith('/')) {
        menuUrl = `http://localhost:${process.env.PORT || 3000}${menuUrl}`;
    }

    const res = await axios.get(menuUrl);

    const action = {
        type: 'RECEIVE_DEMO_MENU',
        payload: res.data.data
    }

    return action;
}

export default actionCreators;

