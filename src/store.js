import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducers/userReducers";
import {
  productCreateReducer,
  productDetailsReducer,
  productListReducer,
} from "./reducers/productReducers";
import { categoryReducer } from "./reducers/categoryReducer";
import { shopReducer } from "./reducers/shopReducer";
import { variationCreateReducer } from "./reducers/variationReducer";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userLogin: userLoginReducer,
  categoryList: categoryReducer,
  shopList: shopReducer,
  productCreate: productCreateReducer,
  variationCreate: variationCreateReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
