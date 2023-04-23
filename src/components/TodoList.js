import React, { useEffect, useState } from "react";
import {
    query,
    collection,
    orderBy,
    where,
    onSnapshot,
    limit,
  } from "firebase/firestore";
  import { auth, db } from "../firebase";
    import TodoCard from "./TodoCard";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {

        const q = query(
            collection(db, "todos"), 
            where("uid", "==", auth.currentUser.uid.toString()));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          let tds = [];
          QuerySnapshot.forEach((doc) => {
            tds.push({ ...doc.data(), id: doc.id });
          });
          setTodos(tds);
        });
        return () => unsubscribe;
      }, []);

  return (
    <div className="text-center">
        <h1 className="mx-auto my-5">Todo List</h1>
        <div className="row mx-5 d-flex justify-content-center">
            {todos?.map((todo) => (
            <TodoCard course={todo.course} title={todo.title} date={todo.date} />
            ))}
        </div>
        <Link to="/todos/new">
            <Button variant="primary" size="lg">
                Add new todo item
            </Button>
        </Link>
    </div>
  );
}

export default TodoList;