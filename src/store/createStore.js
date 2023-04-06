import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./reducers";

// initial states here
const initalState = {};

// middleware
const middleware = [thunk];

// creating store
const store = createStore( rootReducer, initalState, applyMiddleware(...middleware) );

// assigning store to next wrapper
const makeStore = () => store;
const wrapper = createWrapper(makeStore);


export {
    store,
    wrapper
}