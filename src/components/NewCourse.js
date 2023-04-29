import React, { useState } from "react";
import { auth, db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NewCourse = () => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const newTodo = async (event) => {
    event.preventDefault();
    if (code.trim() === "") {
      alert("Enter valid course code");
      return;
    }
    if (name.trim() === "") {
      alert("Enter valid course name");
      return;
    }

    const { uid } = auth.currentUser;
    await addDoc(collection(db, "courses"), {
      code: code,
      name: name,
      uid: uid,
    });
    navigate("/courses");
  };

  return (
    <form onSubmit={(event) => newTodo(event)} className="new-todo input-group">
      <div className="row col-6 mx-auto">
        <h1 className="text-center mx-auto mt-3">Add New Course</h1>
        <div className="col-12 mx-auto mt-5 mb-2">
          <label htmlFor="codeInput" >
            Course code
          </label>
          <input
            id="codeInput"
            name="codeInput"
            type="text"
            className="form-input__input form-control"
            placeholder="enter course code..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="col-12 mx-auto mb-2">
          <label htmlFor="titleInput" >
            Code name
          </label>
          <input
            id="titleInput"
            name="titleInput"
            type="text"
            className="form-input__input form-control"
            placeholder="enter course name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-12 mx-auto text-center">
          <Button type="submit" className="mx-auto px-5">Add Course</Button>
        </div>
      </div>
    </form>
  );
}

export default NewCourse;