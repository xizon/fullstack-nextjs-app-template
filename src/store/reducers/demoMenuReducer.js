//initialize state
const initialState = {
    menuItems: null,
};

export default (state = initialState, action) => {
    switch (action.type) {

        case 'RECEIVE_DEMO_MENU': {
          return { 
                ...state, 
                menuItems: action.payload 
            };
        }   
            
        default:
            return state;
    }
};