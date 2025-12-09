import { ListGroup, Form, Button } from "react-bootstrap";
import { FiTrash2 } from "react-icons/fi";
import { useTodos } from "../context/TodoContext";

export default function TodoItem({ todo }) {
  const { deleteTodo, toggleTodo } = useTodos();

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <div className="d-flex align-items-center gap-3">
        <Form.Check
          type="checkbox"
          checked={todo.done}
          onChange={() => toggleTodo(todo.id)}
        />
        <div>
          <div className={`todo-text ${todo.done ? "done" : ""}`}>
            {todo.text}
          </div>
          <div className="small text-muted">
            {new Date(todo.createdAt).toLocaleString()}
          </div>
        </div>
      </div>

      <Button variant="outline-danger" size="sm" onClick={() => deleteTodo(todo.id)}>
        <FiTrash2 />
      </Button>
    </ListGroup.Item>
  );
}
