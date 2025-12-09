import React, { createContext, useReducer, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { loadState, saveState } from "../utils/storage";

export const FinanceContext = createContext();

const initial = {
  transactions: [],
  budgets: []
};

const LOCAL_KEY = "finance_app_v1";

const reducer = (state, action) => {
  switch (action.type) {
    case "LOAD":
      return action.payload;
    case "ADD_TRANSACTION":
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case "EDIT_TRANSACTION":
      return {
        ...state,
        transactions: state.transactions.map(t => t.id === action.payload.id ? action.payload : t)
      };
    case "DELETE_TRANSACTION":
      return { ...state, transactions: state.transactions.filter(t => t.id !== action.payload) };
    case "ADD_BUDGET":
      return { ...state, budgets: [action.payload, ...state.budgets] };
    case "EDIT_BUDGET":
      return { ...state, budgets: state.budgets.map(b => b.id === action.payload.id ? action.payload : b) };
    case "DELETE_BUDGET":
      return { ...state, budgets: state.budgets.filter(b => b.id !== action.payload) };
    default:
      return state;
  }
};

export const FinanceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    const loaded = loadState(LOCAL_KEY, null);
    if (loaded) dispatch({ type: "LOAD", payload: loaded });
  }, []);

  useEffect(() => {
    saveState(LOCAL_KEY, state);
  }, [state]);

  const addTransaction = (data) => {
    const t = { ...data, id: uuidv4() };
    dispatch({ type: "ADD_TRANSACTION", payload: t });
  };

  const editTransaction = (data) => dispatch({ type: "EDIT_TRANSACTION", payload: data });
  const deleteTransaction = (id) => dispatch({ type: "DELETE_TRANSACTION", payload: id });

  const addBudget = (data) => {
    const b = { ...data, id: uuidv4() };
    dispatch({ type: "ADD_BUDGET", payload: b });
  };
  const editBudget = (data) => dispatch({ type: "EDIT_BUDGET", payload: data });
  const deleteBudget = (id) => dispatch({ type: "DELETE_BUDGET", payload: id });

  return (
    <FinanceContext.Provider value={{
      state,
      addTransaction,
      editTransaction,
      deleteTransaction,
      addBudget,
      editBudget,
      deleteBudget
    }}>
      {children}
    </FinanceContext.Provider>
  );
};
