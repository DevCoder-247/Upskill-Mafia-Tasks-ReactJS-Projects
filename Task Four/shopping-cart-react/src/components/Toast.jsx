import React from "react";
import { useCart } from "../store/CartProvider";

export default function Toast() {
  const { state } = useCart();

  if (!state.toastMessage) return null;

  return <div className="toast">{state.toastMessage}</div>;
}
