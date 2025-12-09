import { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FiPlus } from "react-icons/fi";
import { useTodos } from "../context/TodoContext";

export default function TodoInput() {
  const { addTodo } = useTodos() || {};
  const [text, setText] = useState("");

  const submit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText("");
  };

  return (
    <Form onSubmit={submit} className="mb-3">
      <InputGroup>
        <Form.Control
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" variant="success">
          <FiPlus className="me-1" />
          Add
        </Button>
      </InputGroup>
    </Form>
  );
}
