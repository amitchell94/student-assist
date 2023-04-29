import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NewTodo = () => {
    const [course, setCourse] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const navigate = useNavigate();

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
        navigate("/todos");

    };

    return (
        <form onSubmit={(event) => newTodo(event)} className="new-todo input-group">

            <div className="row col-6 mx-auto">
                <h1 className="text-center mx-auto mt-3">Add New Todo</h1>
                <div className="col-12 mx-auto mt-5 mb-2">
                    <label htmlFor="courseInput" >
                        Course
                    </label>
                    <input
                        id="courseInput"
                        name="courseInput"
                        type="text"
                        className="form-input__input form-control"
                        placeholder="enter course..."
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                    />
                </div>
                <div className="col-12 mx-auto mb-2">
                    <label htmlFor="titleInput" >
                        Title
                    </label>
                    <input
                        id="titleInput"
                        name="titleInput"
                        type="text"
                        className="form-input__input form-control"
                        placeholder="enter title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="col-12 mx-auto mb-4">
                    <label htmlFor="dateInput" >
                        Due Date
                    </label>
                    <input
                        id="dateInput"
                        name="dateInput"
                        type="date"
                        className="form-input__input form-control"
                        placeholder="enter date..."
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="col-12 mx-auto text-center">
                    <Button type="submit" className="mx-auto px-5">Add</Button>
                </div>
            </div>
        </form>
    );
}

export default NewTodo;