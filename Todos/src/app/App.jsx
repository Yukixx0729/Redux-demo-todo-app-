import "./App.scss";
import { TodoList } from "../features/todos/TodoList";
import { Route, Routes } from "react-router-dom";
import { SingleTodo } from "../features/todos/SingleTodo";
import { NavBar } from "./NavBar";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<TodoList />} />
        <Route path="/todo/:todoId" element={<SingleTodo />} />
      </Routes>
    </>
  );
}

export default App;
