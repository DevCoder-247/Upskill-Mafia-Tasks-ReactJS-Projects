import React, { useContext, useMemo, useState } from "react";
import { FinanceContext } from "../context/FinanceContext";

function paginate(items, page, perPage) {
  return items.slice((page - 1) * perPage, page * perPage);
}

export default function TransactionsTable() {
  const { state, deleteTransaction } = useContext(FinanceContext);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");
  const [sortBy, setSortBy] = useState("date_desc");
  const [page, setPage] = useState(1);
  const perPage = 8;

  const settings = JSON.parse(localStorage.getItem("finance_settings_v1"));
  const currency = settings?.currency === "INR" ? "₹" : "$";

  const categories = Array.from(new Set(state.transactions.map(t => t.category)));

  const filtered = useMemo(() => {
    let items = [...state.transactions];
    if (filterCategory) items = items.filter(t => t.category === filterCategory);
    if (filterType) items = items.filter(t => t.type === filterType);
    if (sortBy === 'amount_asc') items.sort((a, b) => a.amount - b.amount);
    if (sortBy === 'amount_desc') items.sort((a, b) => b.amount - a.amount);
    if (sortBy === 'date_asc') items.sort((a, b) => new Date(a.date) - new Date(b.date));
    if (sortBy === 'date_desc') items.sort((a, b) => new Date(b.date) - new Date(a.date));
    return items;
  }, [state.transactions, filterCategory, filterType, sortBy]);

  const pages = Math.max(1, Math.ceil(filtered.length / perPage));
  const shown = paginate(filtered, page, perPage);

  return (
    <div className="transactions-wrapper">

      <div className="transactions-filter-row">
        <select
          className="filter-input"
          value={filterCategory}
          onChange={e => { setFilterCategory(e.target.value); setPage(1); }}
        >
          <option value="">All categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          className="filter-input"
          value={filterType}
          onChange={e => { setFilterType(e.target.value); setPage(1); }}
        >
          <option value="">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="filter-input"
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
        >
          <option value="date_desc">Newest</option>
          <option value="date_asc">Oldest</option>
          <option value="amount_desc">Amount high → low</option>
          <option value="amount_asc">Amount low → high</option>
        </select>
      </div>

      <div className="table-scroll">
        <table className="transactions-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Description</th>
              <th style={{ width: "90px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shown.map(t => (
              <tr key={t.id}>
                <td>{new Date(t.date).toLocaleDateString()}</td>
                <td>{t.category}</td>
                <td>{currency}{t.amount.toFixed(2)}</td>
                <td className={t.type === "income" ? "text-income" : "text-expense"}>
                  {t.type}
                </td>
                <td>{t.description}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => { if (confirm("Delete?")) deleteTransaction(t.id); }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination-container">
        <button
          className="pagination-btn"
          disabled={page <= 1}
          onClick={() => setPage(p => Math.max(1, p - 1))}
        >
          Prev
        </button>

        <span className="pagination-info">
          Page {page} / {pages}
        </span>

        <button
          className="pagination-btn"
          disabled={page >= pages}
          onClick={() => setPage(p => Math.min(p + 1, pages))}
        >
          Next
        </button>
      </div>
    </div>
  );
}
