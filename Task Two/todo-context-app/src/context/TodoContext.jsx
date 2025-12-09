import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const TodoContext = createContext();
export const useTodos = () => useContext(TodoContext);

export function TodoProvider({ children }) {
  const STORAGE_KEY = "todo_list_v1";
  const [todos, setTodos] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (!text.trim()) return;

    setTodos((prev) => [
      {
        id: uuidv4(),
        text: text.trim(),
        done: false,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const deleteTodo = (id) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const clearAll = () => setTodos([]);

  const filterTodos = todos.filter((t) =>
    t.text.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <TodoContext.Provider
      value={{
        todos,
        filterTodos,
        addTodo,
        deleteTodo,
        toggleTodo,
        clearAll,
        query,
        setQuery,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
