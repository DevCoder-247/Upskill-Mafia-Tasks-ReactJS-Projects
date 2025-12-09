import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FiPlus } from 'react-icons/fi';
import { useBuckets } from '../context/BucketContext.jsx';

export default function BucketInput() {
  const { addItem } = useBuckets();
  const [text, setText] = useState('');
  const [err, setErr] = useState('');

  const submit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setErr('Please enter something to save');
      return;
    }
    const ok = addItem({ title: text });
    if (ok) {
      setText('');
      setErr('');
    }
  };

  return (
    <Form onSubmit={submit}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Quick add a bucket item (e.g. 'See Northern Lights')"
          value={text}
          onChange={(e) => { setText(e.target.value); if (err) setErr(''); }}
          aria-label="Quick add bucket item"
        />
        <Button type="submit" variant="success"><FiPlus /> Add</Button>
      </InputGroup>
      {err && <div className="text-danger small mb-3">{err}</div>}
    </Form>
  );
}
