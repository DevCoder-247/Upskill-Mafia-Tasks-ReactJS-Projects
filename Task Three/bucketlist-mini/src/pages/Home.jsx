import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import BucketInput from '../components/BucketInput.jsx';
import BucketList from '../components/BucketList.jsx';
import { useBuckets } from '../context/BucketContext.jsx';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FiTrash2 } from 'react-icons/fi';

export default function Home() {
  const { clearAll, query, setQuery } = useBuckets();

  return (
    <Row className="g-4">
      <Col xs={12}>
        <Card className="hero-card p-4 shadow-sm">
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <h2 className="mb-1">BucketList Mini</h2>
              <p className="text-muted mb-0">Capture little dreams. One item at a time.</p>
            </div>
            <div className="text-end">
              <Button variant="outline-danger" onClick={clearAll}>
                <FiTrash2 className="me-1" /> Clear All
              </Button>
            </div>
          </div>

          <div className="mt-3">
            <Form onSubmit={(e) => e.preventDefault()}>
              <div className="d-flex gap-2">
                <Form.Control placeholder="Search bucket items..." value={query} onChange={(e) => setQuery(e.target.value)} />
                <Button variant="secondary" disabled>Search</Button>
              </div>
            </Form>
          </div>
        </Card>
      </Col>

      <Col xs={12} md={4}>
        <Card className="p-3 shadow-sm">
          <h5 className="mb-3">Quick Add</h5>
          <BucketInput />
          <div className="text-muted small mt-3">Tip: Use the Add page for category & notes.</div>
        </Card>
      </Col>

      <Col xs={12} md={8}>
        <Card className="p-0 shadow-sm">
          <Card.Body>
            <h5 className="mb-3">Your Bucket Items</h5>
            <BucketList />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
