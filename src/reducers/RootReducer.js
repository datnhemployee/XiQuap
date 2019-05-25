import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import NavigationReducer from "./NavigationReducer";
import PostReducer from "./PostReducer";
import StockReducer from "./StockReducer";
import UserReducer from "./UserReducer";

export default combineReducers({
    navigation: NavigationReducer,
    auth: AuthReducer,
    post: PostReducer,
    stock: StockReducer,
    user: UserReducer,
});