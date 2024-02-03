import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { markCompleted, fetchTodoById } from "./todosSlice";
import { useEffect, useState } from "react";
import EditTodoForm from "./EditTodoForm";

export const SingleTodo = () => {
  const dispatch = useDispatch();
  const { todoId } = useParams();
  const [isEdit, setIsEdit] = useState(false);
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

  const handleOnClickToEdit = () => {
    return isEdit ? setIsEdit(false) : setIsEdit(true);
  };

  if (!todo) return <div>...Loading</div>;

  return (
    <section className="single-container">
      <div>
        {" "}
        <button id="editBtn" onClick={handleOnClickToEdit}>
          {!isEdit ? "Edit Todo" : "View Todo"}
        </button>
      </div>

      {isEdit ? (
        <EditTodoForm todo={todo} setIsEdit={setIsEdit} setTodo={setTodo} />
      ) : (
        <div>
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
        </div>
      )}
    </section>
  );
};
