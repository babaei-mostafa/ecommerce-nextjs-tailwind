import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext();

export const ACTIONS = {
  CART_ADD_ITEM: "CART_ADD_ITEM",
  CART_REMOVE_ITEM: "CART_REMOVE_ITEM",
};

const initialState = {
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [] },
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.CART_ADD_ITEM: {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      let cartItems;
      if (existItem) {
        cartItems = state.cart.cartItems.map((item) =>
          item.name === existItem.name ? newItem : item
        );
      } else {
        cartItems = [...state.cart.cartItems, newItem];
      }
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case ACTIONS.CART_REMOVE_ITEM: {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload
      );
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
