import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { markCompleted, selectAllTodos, fetchTodoById } from "./todosSlice";
import { useEffect, useState } from "react";

export const SingleTodo = () => {
  const dispatch = useDispatch();
  const { todoId } = useParams();

  const [todo, setTodo] = useState(null);

  useEffect(() => {
    dispatch(fetchTodoById(todoId))
      .then((result) => {
        setTodo(result.payload);
      })
      .catch((error) => {
        console.error("Failed to fetch todo:", error);
      });
  }, [dispatch]);

  const handleOnClick = (todo) => {
    dispatch(markCompleted(todo)).then((result) => {
      dispatch(fetchTodoById(result.payload.id)).then((result) => {
        setTodo(result.payload);
      });
    });
  };

  if (!todo) return <div>...Loading</div>;

  return (
    <section className="single-container">
      <h2 className="title">To do Name: {todo.name}</h2>{" "}
      <div>
        <p>
          To do Content: <span>{todo.content}</span>
        </p>
        <span>Status:</span>
        {todo.completed ? (
          <span>✅</span>
        ) : (
          <button onClick={() => handleOnClick(todo)}>Done?</button>
        )}
      </div>
    </section>
  );
};
