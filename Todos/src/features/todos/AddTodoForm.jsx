import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewTodo } from "./todosSlice";
import { nanoid } from "@reduxjs/toolkit";

export const AddTodoForm = () => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const onNameChange = (e) => setName(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);

  const canAdd = content && name;

  const handleOnSubmit = async () => {
    if (canAdd) {
      dispatch(addNewTodo({ id: nanoid(), name, content, completed: false }));
      setName("");
      setContent("");
    }
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
      <button type="submit" disabled={!canAdd}>
        Add
      </button>
    </form>
  );
};
