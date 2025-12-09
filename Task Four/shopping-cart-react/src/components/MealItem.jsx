import React, { useRef } from "react";
import { useCart } from "../store/CartProvider";
import Input from "./UI/Input";

const MealItem = ({ meal }) => {
  const { addItem, showToast } = useCart();
  const amountRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const val = +amountRef.current.value;
    if (!val || val < 1) return;

    addItem({ id: meal.id, name: meal.name, price: meal.price, quantity: val });
    showToast(`${meal.name} added to cart`);
    amountRef.current.value = 1;
  };

  return (
    <li className="meal-card">
      <img src={meal.image} alt={meal.name} className="meal-img" />

      <div className="meal-content">
        <h3 className="meal-title">{meal.name}</h3>
        <p className="meal-desc">{meal.description}</p>

        <div className="meal-bottom">
          <span className="meal-price">₹{meal.price.toFixed(2)}</span>

          <form className="meal-form" onSubmit={submitHandler}>
            <Input
              ref={amountRef}
              label="Qty"
              input={{ type: "number", min: 1, defaultValue: 1 }}
            />
            <button type="submit" className="btn add-btn">
              + Add
            </button>
          </form>
        </div>
      </div>
    </li>
  );
};

export default MealItem;
