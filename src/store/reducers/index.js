import { combineReducers } from 'redux';
import demoMenuReducer from '@/store/reducers/demoMenuReducer.js';

export default combineReducers({
    menuData: demoMenuReducer
});

//@link to: `src/pages/_app.tsx`, src/store/createStore.js`