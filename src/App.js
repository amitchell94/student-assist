import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";

import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";
import { Route, Routes } from "react-router-dom";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import NewFinance from "./components/NewFinance";
import FinanceList from "./components/FinanceList";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import UserList from "./components/UserList";
import { propTypes } from "react-bootstrap/esm/Image";
import MyCourses from "./components/MyCourses";
import CourseList from "./components/CourseList";
import NewCourse from "./components/NewCourse";
import CourseInfo from "./components/CourseInfo";
import Profile from "./components/Profile";

function App() {
  const [user] = useAuthState(auth);

  const sendUserInfo = async () => {
    const { uid, displayName } = user;
    await setDoc(doc(db, "users", uid), {
      // id: uid,
      name: displayName
    });
  };

  useEffect(() => {
    if (user) {
      sendUserInfo(user);
    }
  }, [user])

  return (
    <div className="App bg-light">
      <NavBar />
      {!user ? (
        <Welcome />
      ) : (
        <>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/chat/:id' element={<ChatBox/>} />
          <Route path='/todos' element={<TodoList/>} />
          <Route path='/todos/new' element={<NewTodo/>} />
          <Route path='/finances' element={<FinanceList/>} />
          <Route path='/finances/new' element={<NewFinance/>} />
          <Route path='/chat' element={<UserList/>} />
          <Route path='/my_courses' element={<MyCourses/>} />
          <Route path='/courses' element={<CourseList/>} />
          <Route path='/courses/new' element={<NewCourse/>} />
          <Route path='/course/:id' element={<CourseInfo/>} />
          <Route path='/profile' element={<Profile/>} />
        </Routes>
        </>
      )}
    </div>
  );
}

export default App;
