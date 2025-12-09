import React from "react";
import ModalPortal from "./UI/ModalPortal";
import Cart from "./Cart";
import { useCart } from "../store/CartProvider";

export default function CartModal() {
  const { toggleCart } = useCart();

  return (
    <ModalPortal>
      <div className="modal-backdrop" onClick={toggleCart} />
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <Cart />
      </div>
    </ModalPortal>
  );
}
