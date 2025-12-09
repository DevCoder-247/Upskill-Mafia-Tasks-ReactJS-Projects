import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import StudentList from "./routes/StudentList";
import AddStudent from "./routes/AddStudent";
import EditStudent from "./routes/EditStudent";

export default function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>Student MGMNT</h1>
        <nav>
          <Link to="/">List</Link>
          <Link to="/add">Add Student</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit/:id" element={<EditStudent />} />
        </Routes>
      </main>
    </div>
  )
}

