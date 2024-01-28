import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch("http://localhost:3000/todos");
  const data = await res.json();

  return data;
});

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (initialState) => {
    const res = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initialState),
    });
    const data = await res.json();
    console.log(data);
    return data;
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(addNewTodo.fulfilled, (state, action) => {});
  },
});

export default todosSlice.reducer;

export const selectAllTodos = (state) => state.todos;

export const selectTodoById = (state, todoId) =>
  state.todos.find((todo) => todo.id === todoId);
