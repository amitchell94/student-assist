import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";

import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App bg-light">
      <NavBar />
      {!user ? (
        <Welcome />
      ) : (
        <>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/chat' element={<ChatBox/>} />
          <Route path='/todos' element={<TodoList/>} />
          <Route path='/todos/new' element={<NewTodo/>} />
        </Routes>
        </>
      )}
    </div>
  );
}

export default App;
