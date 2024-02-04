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

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (canAdd) {
      dispatch(addNewTodo({ id: nanoid(), name, content, completed: false }));
      setName("");
      setContent("");
    }
  };
  return (
    <form onSubmit={handleOnSubmit}>
      <h2 className="title">Add to do </h2>
      <div>
        <label>Title :</label>
        <input
          type="text"
          name="name"
          onChange={onNameChange}
          value={name}
          className="input"
        />
      </div>
      <div>
        <label>Note :</label>
        <textarea
          name="content"
          onChange={onContentChange}
          value={content}
          rows="4"
          className="input"
        />
      </div>
      <button type="submit" disabled={!canAdd}>
        Add
      </button>
    </form>
  );
};
