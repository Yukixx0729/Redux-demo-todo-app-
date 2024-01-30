import { useDispatch, useSelector } from "react-redux";
import {
  fetchTodos,
  selectAllTodos,
  markCompleted,
  deleteTodo,
} from "./todosSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { AddTodoForm } from "./AddTodoForm";

export const TodoList = () => {
  const todos = useSelector(selectAllTodos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleOnClick = (todo) => {
    dispatch(markCompleted(todo));
  };

  const handleOnDelete = (todo) => {
    dispatch(deleteTodo(todo));
  };

  if (todos.length === 0) return <p>No todos</p>;

  const renderTodos = todos.map((todo) => {
    return (
      <li key={todo.id}>
        <Link to={`/todo/${todo.id}`}>
          <span>{todo.name}</span>{" "}
        </Link>
        {todo.completed ? (
          <span>✅</span>
        ) : (
          <button onClick={() => handleOnClick(todo)}>Done?</button>
        )}

        <button onClick={() => handleOnDelete(todo)}>Delete</button>
      </li>
    );
  });

  return (
    <section>
      <h2 className="title">To do list</h2>
      <ul className="todo-container">{renderTodos}</ul>
      <h2 className="title">Add to do </h2>
      <AddTodoForm />
    </section>
  );
};
