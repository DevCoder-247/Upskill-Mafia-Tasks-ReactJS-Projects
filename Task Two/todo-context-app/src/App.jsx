import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "./components/Header";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div className="app-root">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <Card className="shadow-sm app-card">
              <Card.Body>
                <Header />
                <TodoInput />
                <TodoList />
                <div className="small mt-3 text-muted text-center">
                  Built with React • Context API • Vite • localStorage
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
