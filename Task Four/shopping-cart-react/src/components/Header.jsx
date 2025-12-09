import React from "react";
import { useCart } from "../store/CartProvider";

export default function Header() {
  const { state, toggleCart } = useCart();

  const totalItems = state.items.reduce((sum, it) => sum + it.quantity, 0);

  return (
    <header className="header">
      <div className="header__title">
        <h1>Calm Cart</h1>
        <p className="muted">Simple Shopping Cart</p>
      </div>
      <div>
        <button className="cart-btn" onClick={toggleCart}>
          Cart ({totalItems})
        </button>
      </div>
    </header>
  );
}
