import { createStore, applyMiddleware } from "redux";
import RootReducer from "../reducers/RootReducer";
import ReduxThunk from 'redux-thunk';

export default store = createStore(
    RootReducer,
    {},
    applyMiddleware(ReduxThunk)
);