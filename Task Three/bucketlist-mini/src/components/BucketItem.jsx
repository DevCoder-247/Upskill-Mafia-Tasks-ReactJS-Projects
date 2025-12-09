import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { FiTrash2 } from 'react-icons/fi';
import { useBuckets } from '../context/BucketContext.jsx';
import Form from 'react-bootstrap/Form';

export default function BucketItem({ item }) {
  const { deleteItem, toggleDone } = useBuckets();

  return (
    <ListGroup.Item className="d-flex align-items-start justify-content-between py-3">
      <div className="d-flex gap-3 align-items-start">
        <Form.Check
          checked={item.done}
          onChange={() => toggleDone(item.id)}
          aria-label={`Mark ${item.title} done`}
        />
        <div>
          <div className={`fw-semibold ${item.done ? 'text-muted done' : ''}`} style={{ fontSize: '1rem' }}>
            {item.title}
            {item.category && <Badge bg="warning" text="dark" className="ms-2">{item.category}</Badge>}
          </div>
          {item.note && <div className="small text-muted mt-1">{item.note}</div>}
          <div className="small text-muted mt-1">{new Date(item.createdAt).toLocaleString()}</div>
        </div>
      </div>

      <div>
        <Button variant="outline-danger" size="sm" onClick={() => deleteItem(item.id)}>
          <FiTrash2 />
        </Button>
      </div>
    </ListGroup.Item>
  );
}
