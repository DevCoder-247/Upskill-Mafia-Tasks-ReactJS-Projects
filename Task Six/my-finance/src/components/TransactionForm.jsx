import React, { useState, useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { formatISO } from "date-fns";

const defaultCategories = ["Salary", "Groceries", "Rent", "Entertainment", "Utilities", "Transport", "Other"];

export default function TransactionForm({ initial = null, onSaved }) {
  const { addTransaction, editTransaction, state } = useContext(FinanceContext);

  const [form, setForm] = useState(
    initial ?? {
      type: "expense",
      amount: "",
      category: defaultCategories[0],
      date: formatISO(new Date(), { representation: "date" }),
      description: ""
    }
  );

  const settings = JSON.parse(localStorage.getItem("finance_settings_v1"));
  const currency = settings?.currency === "INR" ? "₹" : "$";

  const validate = () => {
    if (!form.amount || isNaN(Number(form.amount)))
      return { ok: false, msg: "Enter a valid amount" };
    if (!form.category) return { ok: false, msg: "Select a category" };
    return { ok: true };
  };

  const submit = (e) => {
    e.preventDefault();
    const v = validate();
    if (!v.ok) return alert(v.msg);

    const payload = {
      ...form,
      amount: Number(form.amount),
      date: new Date(form.date).toISOString()
    };

    if (initial) {
      editTransaction({ ...initial, ...payload });
    } else {
      addTransaction(payload);
    }

    if (onSaved) onSaved();

    if (!initial) {
      setForm({
        type: "expense",
        amount: "",
        category: defaultCategories[0],
        date: formatISO(new Date(), { representation: "date" }),
        description: ""
      });
    }
  };

  return (
    <form className="transaction-form" onSubmit={submit}>
      
      <label className="form-field">
        <span className="form-label">Type</span>
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>

      <label className="form-field">
        <span className="form-label">Amount</span>
        <input
          type="number"
          value={form.amount}
          placeholder={`Enter amount in ${currency}`}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
        />
      </label>

      <label className="form-field">
        <span className="form-label">Category</span>
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {defaultCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
          {state.budgets.map((b) => (
            <option key={b.id} value={b.category}>{b.category}</option>
          ))}
        </select>
      </label>

      <label className="form-field">
        <span className="form-label">Date</span>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
      </label>

      <label className="form-field">
        <span className="form-label">Description</span>
        <input
          type="text"
          placeholder="Optional"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </label>

      <button className="submit-btn" type="submit">
        {initial ? "Save" : "Add Transaction"}
      </button>
    </form>
  );
}
