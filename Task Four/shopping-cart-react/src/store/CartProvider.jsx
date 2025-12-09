import React, { createContext, useContext, useReducer, useRef, useEffect } from "react";
import { cartReducer, initialState } from "./cart-reducer";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const toastTimerRef = useRef(null);

  const addItem = (item) => dispatch({ type: "ADD_ITEM", payload: { item } });
  const removeItem = (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  const toggleCart = () => dispatch({ type: "TOGGLE_CART" });

  const showToast = (msg) => {
    dispatch({ type: "SHOW_TOAST", payload: msg });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      dispatch({ type: "HIDE_TOAST" });
      toastTimerRef.current = null;
    }, 1600);
  };

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        clearCart,
        toggleCart,
        showToast,
        dispatch
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
