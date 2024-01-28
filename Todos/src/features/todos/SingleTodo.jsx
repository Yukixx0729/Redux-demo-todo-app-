import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectTodoById, selectAllTodos } from "./todosSlice";

export const SingleTodo = () => {
  const { todoId } = useParams();
  const todos = useSelector(selectAllTodos);

  const todo = useSelector((state) => selectTodoById(state, todoId));

  return (
    <section className="single-container">
      <h2 className="title">To do Name: {todo.name}</h2>{" "}
      <div>
        <p>
          To do Content: <span>{todo.content}</span>
        </p>
        <span>Status:</span>
        {todo.completed ? <span>✅</span> : <button>Done?</button>}
      </div>
    </section>
  );
};
