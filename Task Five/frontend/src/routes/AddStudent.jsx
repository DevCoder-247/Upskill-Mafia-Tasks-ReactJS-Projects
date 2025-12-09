import React from "react";
import StudentForm from "../components/StudentForm";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function AddStudent() {
    const navigate = useNavigate()

    const handleSubmit = async (data) => {
        try{
            await API.post('/students',data)
            alert('Student Added');
        } catch (err) {
            console.error(err);
            alert('Add Failed');
        }
    }

    return(
        <div>
            <h2>Add Student </h2>
            <StudentForm onSubmit={handleSubmit} />
        </div>
    )
}