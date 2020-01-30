import {createSelector} from "reselect";

const SelectCart = (state) => state.cart;

const selectCart  = (state )=> state.cart;
export const selectCartHidden = createSelector(
     [selectCart],
     (cart) => cart.hidden
)

export const SelectCartItems = createSelector(
     [SelectCart],
     (cart) => cart.cartItems
);
export const selectCartItemsCount = createSelector(
     [SelectCartItems],
     (cartItems) =>
     ( cartItems.reduce((accumulatedQuantity, cartItem) =>
     accumulatedQuantity + cartItem.quantity, 0))
);

//120 CheckOut Page selector

export const selectCartTotal = createSelector(
     [SelectCartItems],
     (cartItems => 
          cartItems.reduce((accumulatedQuantity, cartItem) =>
          accumulatedQuantity + cartItem.quantity * cartItem.price, 0)
     )
);