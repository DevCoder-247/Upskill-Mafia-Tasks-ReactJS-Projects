import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <Card className="text-center shadow-sm">
      <Card.Body>
        <h3>404 — Not Found</h3>
        <p className="text-muted">We couldn't find that page.</p>
        <Button as={Link} to="/" variant="primary">Go Home</Button>
      </Card.Body>
    </Card>
  );
}
