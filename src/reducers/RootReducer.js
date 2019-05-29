import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import NavigationReducer from "./NavigationReducer";
import PostReducer from "./PostReducer";
import StockReducer from "./StockReducer";
import UserReducer from "./UserReducer";
import MyShopReducer from "./MyShopReducer";
import MyStockReducer from "./MyStockReducer";
import WaittingReducer from "./WaittingReducer";
import BoughtReducer from "./BoughtReducer";
import PhotoReducer from "./PhotoReducer";
import TypeItemReducer from "./TypeItemReducer";

export default combineReducers({
    navigation: NavigationReducer,
    auth: AuthReducer,
    post: PostReducer,
    stock: StockReducer,
    user: UserReducer,
    myShop: MyShopReducer,
    myStock: MyStockReducer,
    waitting: WaittingReducer,
    bought: BoughtReducer,
    photo: PhotoReducer,
    type: TypeItemReducer,
});