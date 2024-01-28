import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectTodoById, selectAllTodos } from "./todosSlice";

export const SingleTodo = () => {
  const { todoId } = useParams();
  const todos = useSelector(selectAllTodos);

  const todo = useSelector((state) => selectTodoById(state, todoId));

  return (
    <section>
      <h2>To do Name: {todo.name}</h2>
      <p>To do Content: {todo.content}</p>
      <span>completed?</span>
      <button>{todo.completed ? "Done" : "Not yet!"}</button>
    </section>
  );
};
