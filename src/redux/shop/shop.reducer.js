//164.1
// import SHOP_DATA from "./shop.data";
import ShopActionTypes from "./shop.types";

const INITIAL_STATE = {
     //164.1
     collections: null
}

const ShopReducer = (state = INITIAL_STATE, action) => {
     switch (action.type) {
          case ShopActionTypes.UPDATE_COLLECTIONS:
               return{
                    ...state,
                    collections: action.payload
               }
          default:
               return state;
     }
}
export default ShopReducer;