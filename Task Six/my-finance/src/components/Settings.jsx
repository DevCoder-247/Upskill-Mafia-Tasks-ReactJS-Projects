import React, { useState, useEffect, useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const SETTINGS_KEY = "finance_settings_v1";

export default function Settings() {
  const { state } = useContext(FinanceContext);

  const [settings, setSettings] = useState({
    username: "",
    currency: "INR",
    theme: "light",
    monthlyGoal: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
  document.body.className = settings.theme === "dark" ? "dark" : "";
}, [settings.theme]);


  const saveSettings = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    alert("Settings saved successfully!");
  };

  const resetAllData = () => {
    if (confirm("Are you sure you want to delete ALL data?")) {
      localStorage.clear();
      location.reload();
    }
  };

  return (
    <div style={styles.container}>
      <h2>App Settings</h2>

      <div style={styles.field}>
        <label>Username</label>
        <input
          type="text"
          value={settings.username}
          onChange={(e) =>
            setSettings({ ...settings, username: e.target.value })
          }
        />
      </div>

      <div style={styles.field}>
        <label>Default Currency</label>
        <select
          value={settings.currency}
          onChange={(e) =>
            setSettings({ ...settings, currency: e.target.value })
          }
        >
          <option value="INR">INR (₹)</option>
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="GBP">GBP (£)</option>
        </select>
      </div>

      <div style={styles.field}>
        <label>Theme Mode</label>
        <select
          value={settings.theme}
          onChange={(e) =>
            setSettings({ ...settings, theme: e.target.value })
          }
        >
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
      </div>

      <div style={styles.field}>
        <label>Monthly Savings Goal</label>
        <input
          type="number"
          placeholder="Enter amount"
          value={settings.monthlyGoal}
          onChange={(e) =>
            setSettings({ ...settings, monthlyGoal: e.target.value })
          }
        />
      </div>

      <button style={styles.saveBtn} onClick={saveSettings}>
        Save Settings
      </button>

      <div style={styles.dangerBox}>
        <h3 style={{ marginBottom: 8 }}>Danger Zone</h3>
        <button style={styles.deleteBtn} onClick={resetAllData}>
          Reset All App Data
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  field: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  saveBtn: {
    padding: "10px 16px",
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginTop: "10px",
  },
  dangerBox: {
    marginTop: "30px",
    padding: "15px",
    border: "1px solid red",
    borderRadius: "6px",
    background: "#ffe5e5",
  },
  deleteBtn: {
    padding: "10px 16px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};
