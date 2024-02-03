import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo, fetchTodoById } from "./todosSlice";
import { useParams } from "react-router-dom";

const EditTodoForm = ({ todo, setIsEdit, setTodo }) => {
  const dispatch = useDispatch();
  const { todoId } = useParams();
  const [content, setContent] = useState(todo.content);
  const [name, setName] = useState(todo.name);

  const onNameChange = (e) => setName(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const updatedTodo = { ...todo, name: name, content: content };

    dispatch(editTodo(updatedTodo)).then((result) => {
      dispatch(fetchTodoById(result.payload.id)).then((result) => {
        setTodo(result.payload);
      });
    });
    setIsEdit(false);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div>
        <label>To do name:</label>
        <input type="text" name="name" onChange={onNameChange} value={name} />
      </div>
      <div>
        <label>To do content:</label>
        <input
          type="text"
          name="content"
          onChange={onContentChange}
          value={content}
        />
      </div>
      <button type="submit">Update</button>
    </form>
  );
};

export default EditTodoForm;
