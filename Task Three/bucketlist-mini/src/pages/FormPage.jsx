import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { useBuckets } from '../context/BucketContext.jsx';

export default function FormPage() {
  const { addItem } = useBuckets();
  const [data, setData] = useState({
    title: '', category: '', note: '', name: '', email: '', password: ''
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState('');

  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = ({ title, name, email, password }) => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    if (!name.trim()) e.name = 'Your name is required';
    if (!email.trim()) e.email = 'Email is required';
    else if (!emailRx.test(email.trim())) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 8) e.password = 'Password must be at least 8 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate(data)) return;

    // add bucket item
    const ok = addItem({ title: data.title, category: data.category, note: data.note });
    if (ok) {
      setSuccess('Bucket item added successfully!');
      setData({ title: '', category: '', note: '', name: '', email: '', password: '' });
      setErrors({});
      setTimeout(() => setSuccess(''), 2500);
    } else {
      setErrors({ form: 'Failed to add item — try again' });
    }
  };

  const onChange = (k) => (e) => {
    setData(prev => ({ ...prev, [k]: e.target.value }));
    setErrors(prev => ({ ...prev, [k]: undefined }));
  };

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h4>Add Bucket Item (Detailed)</h4>
        <p className="text-muted">Provide a title and optional category & note. Also demo registration validation below.</p>

        {success && <Alert variant="success">{success}</Alert>}
        {errors.form && <Alert variant="danger">{errors.form}</Alert>}

        <Form noValidate onSubmit={submit}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title *</Form.Label>
            <Form.Control value={data.title} onChange={onChange('title')} isInvalid={!!errors.title} />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control value={data.category} onChange={onChange('category')} placeholder="e.g., Travel, Learn, Food" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="note">
            <Form.Label>Note</Form.Label>
            <Form.Control as="textarea" rows={3} value={data.note} onChange={onChange('note')} />
          </Form.Group>

          <hr />

          <h5 className="mb-3">Profile (Demo validation)</h5>

          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Your Name *</Form.Label>
            <Form.Control value={data.name} onChange={onChange('name')} isInvalid={!!errors.name} />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email *</Form.Label>
            <Form.Control type="email" value={data.email} onChange={onChange('email')} isInvalid={!!errors.email} />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password *</Form.Label>
            <Form.Control type="password" value={data.password} onChange={onChange('password')} isInvalid={!!errors.password} />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" variant="primary">Add Item</Button>
            <Button variant="outline-secondary" onClick={() => { setData({ title: '', category: '', note: '', name: '', email: '', password: '' }); setErrors({}); setSuccess(''); }}>
              Reset
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}
