import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await fetch("http://localhost:3000/todos");
  const data = await res.json();
  return data;
});

export const addNewTodo = createAsyncThunk(
  "todos/addNewTodo",
  async (initialState) => {
    await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(initialState),
    });
    return initialState;
  }
);

export const fetchTodoById = createAsyncThunk(
  "todos/fetchTodoById",
  async (todoId) => {
    const res = await fetch(`http://localhost:3000/todos/${todoId}`);
    const data = await res.json();
    return data;
  }
);

export const markCompleted = createAsyncThunk(
  "todos/markCompleted",
  async (todo) => {
    if (todo && !todo.completed) {
      const updatedTodo = { ...todo, completed: true };

      await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      return updatedTodo;
    }
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (todo) => {
  if (todo) {
    await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return todo;
  }
});

export const editTodo = createAsyncThunk(
  "todos/editTodo",
  async (updatedTodo) => {
    if (updatedTodo) {
      console.log("slice", updatedTodo);
      await fetch(`http://localhost:3000/todos/${updatedTodo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      return updatedTodo;
    }
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
    builder.addCase(addNewTodo.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(markCompleted.fulfilled, (state, action) => {
      const updatedTodo = action.payload;
      const index = state.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        state[index] = updatedTodo;
      }
    });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      const deleteTodo = action.payload;
      const index = state.findIndex((todo) => todo.id === deleteTodo.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    });
    builder.addCase(editTodo.fulfilled, (state, action) => {
      const updatedTodo = action.payload;
      const index = state.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        state[index] = updatedTodo;
      }
    });
  },
});

export default todosSlice.reducer;

export const selectAllTodos = (state) => state.todos;
