import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { FinanceProvider } from "./context/FinanceContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FinanceProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FinanceProvider>
  </React.StrictMode>
);
