import React from "react";
import Header from "./components/Header";
import Meals from "./components/Meals";
import CartModal from "./components/CartModal";
import Toast from "./components/Toast";
import { useCart } from "./store/CartProvider";

export default function App() {
  const { state } = useCart();

  return (
    <>
      <Header />
      <main className="container">
        <Meals />
      </main>

      {state.isCartOpen && <CartModal />}

      <Toast />
    </>
  );
}
