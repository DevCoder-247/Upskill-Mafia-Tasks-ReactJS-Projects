import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";

export default function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);

  const load = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/students/${id}`);
      setStudent(res.data);
    } catch (err) {
      console.error("Failed to load student", err);
    }
  };

  const updateStudent = async (data) => {
    await axios.put(`http://localhost:4000/students/${id}`, data);
    navigate("/");
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Edit Student</h2>
      {student ? (
        <StudentForm initial={student} onSubmit={updateStudent} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
