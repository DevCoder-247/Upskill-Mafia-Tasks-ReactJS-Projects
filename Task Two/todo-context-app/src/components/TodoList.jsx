import { ListGroup } from "react-bootstrap";
import { useTodos } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { filterTodos } = useTodos();   

  const list = filterTodos || [];

  if (list.length === 0) {
    return (
      <div className="text-center text-muted py-3">
        No tasks found
      </div>
    );
  }

  return (
    <ListGroup className="todo-list">
      {list.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ListGroup>
  );
}
