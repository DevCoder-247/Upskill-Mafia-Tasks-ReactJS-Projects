import React, { useContext, useMemo } from "react";
import { FinanceContext } from "../context/FinanceContext";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart, CategoryScale, LinearScale, PointElement,
  LineElement, ArcElement, Tooltip, Legend
} from "chart.js";
import { getColor, getBorderColor } from "../utils/colors";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { state } = useContext(FinanceContext);
  const transactions = state.transactions;

  const totals = useMemo(() => {
    const income = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      income,
      expenses,
      savings: income - expenses
    };
  }, [transactions]);


  const categoryData = useMemo(() => {
    const map = {};
    transactions.filter(t => t.type === "expense").forEach(t => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return map;
  }, [transactions]);

  const categories = Object.keys(categoryData);
  const values = Object.values(categoryData);


  const pieData = {
    labels: categories,
    datasets: [
      {
        data: values,
        backgroundColor: categories.map((_, i) => getColor(i)),
        borderColor: categories.map((_, i) => getBorderColor(i)),
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  const monthly = useMemo(() => {
    const map = {};
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleString("default", { month: "short" });

      const total = transactions
        .filter(t => t.type === "expense" &&
          new Date(t.date).getMonth() === d.getMonth())
        .reduce((sum, t) => sum + t.amount, 0);

      map[key] = total;
    }

    return map;
  }, [transactions]);

  const lineData = {
    labels: Object.keys(monthly),
    datasets: [
      {
        label: "Monthly Expenses",
        data: Object.values(monthly),
        borderColor: "#4e79a7",
        backgroundColor: "rgba(78, 121, 167, 0.25)",
        fill: true,
        tension: 0.35,
        pointRadius: 5,
        pointBackgroundColor: "#4e79a7",
      },
    ],
  };

  return (
    <div className="dashboard-wrapper">

      <div className="dashboard-card-container">
        <div className="dashboard-card">
          <h3>Total Income</h3>
          <p>₹{totals.income.toFixed(2)}</p>
        </div>

        <div className="dashboard-card">
          <h3>Total Expenses</h3>
          <p>₹{totals.expenses.toFixed(2)}</p>
        </div>

        <div className="dashboard-card">
          <h3>Savings</h3>
          <p>₹{totals.savings.toFixed(2)}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h4>Monthly Spending Trend</h4>
          <Line data={lineData} />
        </div>

        <div className="chart-card">
          <h4>Category-wise Expenses</h4>
          <Pie data={pieData} />
        </div>
      </div>

      <div className="highest-expense-card">
        <h3>Highest Expense Categories</h3>

        {Object.keys(categoryData).length === 0 ? (
          <p>No expenses yet</p>
        ) : (
          <div className="expense-list">
            {Object.entries(categoryData)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
              .map(([cat, amount], index) => (
                <div className="expense-item" key={cat}>
                  <div className="expense-info">
                    <span
                      className="expense-dot"
                      style={{ background: getColor(index) }}
                    ></span>
                    <span className="expense-name">{cat}</span>
                  </div>

                  <strong className="expense-amount">
                    ₹{amount.toFixed(2)}
                  </strong>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
