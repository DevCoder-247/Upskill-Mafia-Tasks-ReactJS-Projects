import React from "react";
import MealItem from "./MealItem";
import MEALS from "../data/meal.js";

export default function Meals() {
  return (
    <section className="meals">
      <h2>Available Meals</h2>
      <ul className="meals-grid">
        {MEALS.map((m) => (
          <MealItem key={m.id} meal={m} />
        ))}
      </ul>
    </section>
  );
}
