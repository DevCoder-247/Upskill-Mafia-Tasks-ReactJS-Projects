import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import DashboardPage from "./pages/DashboardPage"
import AddTransactionPage from './pages/AddTransactionPage'
import TransactionsPage from './pages/TransactionsPage'
import BudgetsPage from './pages/BudgetsPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'


const App = () => {
  return (
    <div className='app'>
      <nav className='top-nav'>
        <Link to="/">Dashboard</Link>
        <Link to="/add">Add Transaction</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/budgets">Budgets</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <main style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/add" element={<AddTransactionPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/budgets" element={<BudgetsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App