import React, { useContext, useState, useMemo } from "react";
import { FinanceContext } from "../context/FinanceContext";

export default function BudgetList() {
  const { state, addBudget, editBudget, deleteBudget } = useContext(FinanceContext);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState("");
  const settings = JSON.parse(localStorage.getItem("finance_settings_v1"));
  const currency = settings?.currency === "INR" ? "₹" : "$";


  const spendingByCategory = useMemo(() => {
    const m = {};
    state.transactions.filter(t=>t.type==='expense').forEach(t=>{
      m[t.category] = (m[t.category]||0)+t.amount;
    });
    return m;
  }, [state.transactions]);

  const add = (e) => {
    e.preventDefault();
    if (!category || !limit || isNaN(Number(limit))) return alert("Enter valid category and limit");
    addBudget({ category, limit: Number(limit) });
    setCategory(""); setLimit("");
  };

  return (
    <div>
      <form onSubmit={add}>
        <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
        <input placeholder="Limit" value={limit} onChange={e=>setLimit(e.target.value)} />
        <button type="submit">Add Budget</button>
      </form>

      <div style={{ marginTop: 12 }}>
        {state.budgets.length === 0 && <p>No budgets yet</p>}
        {state.budgets.map(b => {
          const spent = spendingByCategory[b.category] || 0;
          const pct = Math.min(100, (spent / b.limit) * 100);
          const over = spent > b.limit;
          return (
            <div key={b.id} style={{ border: '1px solid #ddd', padding: 10, marginTop: 8 }}>
              <h4>{b.category} — Limit: {b.limit.toFixed(2)}</h4>
              <div style={{ height: 16, background: '#eee' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: over ? 'red' : 'green' }} />
              </div>
              <p>Spent: {spent.toFixed(2)} ({pct.toFixed(1)}%) {over && <strong>— Overspent!</strong>}</p>
              <button onClick={()=>deleteBudget(b.id)}>Delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
