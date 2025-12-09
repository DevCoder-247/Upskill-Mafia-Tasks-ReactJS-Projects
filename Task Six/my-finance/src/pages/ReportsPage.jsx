import React, { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

function toCSV(rows) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  for (const r of rows) {
    lines.push(headers.map(h => {
      const v = r[h];
      if (typeof v === 'string' && v.includes(',')) return `"${v.replace(/"/g,'""')}"`;
      return v;
    }).join(","));
  }
  return lines.join("\n");
}

export default function ReportsPage() {
  const { state } = useContext(FinanceContext);

  const exportCSV = () => {
    const rows = state.transactions.map(t => ({
      id: t.id, date: t.date, category: t.category, amount: t.amount, type: t.type, description: t.description
    }));
    const csv = toCSV(rows);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transactions-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1>Reports</h1>
      <button onClick={exportCSV}>Export Transactions as CSV</button>

      <div style={{ marginTop: 16 }}>
        <h3>Summary</h3>
        <p>Total transactions: {state.transactions.length}</p>
        <p>Total income: {state.transactions.filter(t=>t.type==='income').reduce((s,t)=>s+t.amount,0).toFixed(2)}</p>
        <p>Total expenses: {state.transactions.filter(t=>t.type==='expense').reduce((s,t)=>s+t.amount,0).toFixed(2)}</p>
      </div>
    </div>
  );
}
