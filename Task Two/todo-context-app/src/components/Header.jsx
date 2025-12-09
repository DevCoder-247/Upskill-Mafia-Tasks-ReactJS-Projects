import { Row, Col, Button, Form } from "react-bootstrap";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { useTodos } from "../context/TodoContext";

export default function Header() {
  const { query, setQuery, clearAll } = useTodos();

  return (
    <div className="app-header mb-3">
      <Row className="align-items-center">
        <Col xs={8}>
          <h3 className="app-title">TaskBoard</h3>
          <div className="text-muted">Your daily task manager</div>
        </Col>
        <Col xs={4} className="text-end">
          <Button variant="outline-secondary" size="sm" onClick={clearAll}>
            <FiTrash2 className="me-1" /> Clear All
          </Button>
        </Col>
      </Row>

      <Form className="mt-3"
        onSubmit={(e) => e.preventDefault()} // after clicked enter on search todos stays , remove this and all will be gone
      >
        <Form.Group>
          <div className="d-flex">
            <Form.Control
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="secondary" className="ms-2" disabled>
              <FiSearch />
            </Button>
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}
