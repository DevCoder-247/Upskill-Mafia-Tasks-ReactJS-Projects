import React from "react";
import { useCart } from "../store/CartProvider";

export default function Cart() {
  const { state, removeItem, clearCart, toggleCart } = useCart();

  const total = state.items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul className="cart-items">
        {state.items.length === 0 && <li className="muted">Cart is empty</li>}
        {state.items.map((it) => (
          <li key={it.id} className="cart-item">
            <div>
              <strong>{it.name}</strong>
              <div className="muted">₹{it.price.toFixed(2)} × {it.quantity}</div>
            </div>
            <div className="cart-actions">
              <button className="btn small" onClick={() => removeItem(it.id)}>
                −
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="cart-total">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>

      <div className="cart-controls">
        <button className="btn" onClick={clearCart}>Clear</button>
        <button className="btn primary" onClick={toggleCart}>Close</button>
      </div>
    </div>
  );
}
