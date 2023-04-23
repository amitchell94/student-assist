import React, { useEffect, useState } from "react";
  import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const NewTodo = () => {
    const [todos, setTodos] = useState([]);
    const [course, setCourse] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");

    const newTodo = async (event) => {
        event.preventDefault();
        if (course.trim() === "") {
          alert("Enter valid course");
          return;
        }
        if (title.trim() === "") {
            alert("Enter valid title");
            return;
        }
        if (date.trim() === "") {
            alert("Enter valid date");
            return;
        }

        const { uid } = auth.currentUser;
        await addDoc(collection(db, "todos"), {
            course,
            title,
            date,
            createdAt: serverTimestamp(),
            uid,
        });

      };

  return (
    <form onSubmit={(event) => newTodo(event)} className="new-todo">
        <label htmlFor="courseInput" hidden>
        Enter Course
        </label>
        <input
        id="courseInput"
        name="courseInput"
        type="text"
        className="form-input__input"
        placeholder="enter course..."
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        />
        <label htmlFor="titleInput" hidden>
        Enter Title
        </label>
        <input
        id="titleInput"
        name="titleInput"
        type="text"
        className="form-input__input"
        placeholder="enter title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="dateInput" hidden>
        Enter Date
        </label>
        <input
        id="dateInput"
        name="dateInput"
        type="date"
        className="form-input__input"
        placeholder="enter date..."
        value={date}
        onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add</button>
  </form>
  );
}

export default NewTodo;