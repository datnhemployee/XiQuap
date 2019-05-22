import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import NavigationReducer from "./NavigationReducer";
import PostReducer from "./PostReducer";

export default combineReducers({
    navigation: NavigationReducer,
    auth: AuthReducer,
    post: PostReducer,
});