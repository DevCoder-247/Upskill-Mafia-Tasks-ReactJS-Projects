import React, { useState, useEffect } from 'react';

export default function StudentForm({ onSubmit, initial }) {
  const [form, setForm] = useState({
    name: '',
    age: '',
    course: '',
    email: '',
  });

  const [errors, setErrors] = useState({});

  // Load initial values when editing
  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || '',
        age: String(initial.age || ''),
        course: initial.course || '',
        email: initial.email || '',
      });
    }
  }, [initial]);

  // Validate inputs
  const validate = () => {
    const e = {};

    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.age || isNaN(Number(form.age)) || Number(form.age) <= 0)
      e.age = 'Valid age is required';
    if (!form.course.trim()) e.course = 'Course is required';

    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      e.email = 'Invalid email format';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      ...form,
      age: Number(form.age),
    });
  };

  return (
    <form onSubmit={submit} className="student-form">

      <div className="field">
        <label>Name</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        {errors.name && <small className="error">{errors.name}</small>}
      </div>

      <div className="field">
        <label>Age</label>
        <input
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />
        {errors.age && <small className="error">{errors.age}</small>}
      </div>

      <div className="field">
        <label>Course</label>
        <input
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
        />
        {errors.course && <small className="error">{errors.course}</small>}
      </div>

      <div className="field">
        <label>Email</label>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        {errors.email && <small className="error">{errors.email}</small>}
      </div>

      <button type="submit" style={{ marginTop: '12px' }}>
        Save
      </button>
    </form>
  );
}
