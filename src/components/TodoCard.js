import { deleteDoc } from "firebase/firestore";
import React from "react";
import { Button } from "react-bootstrap";

const TodoCard= ({id, course, title, date, deleteTodo}) => {
 

  return (
    <div className="col-4 mb-5">
        <div className="card">
            <h4 className="mt-5 card-title">{course}</h4>
            <h2 className="mt-2 card-title">{title}</h2>
            <p className="mx-3 mb-3 mt-3 card-subtitle fs-5">Due: {date}</p>
            <Button className="btn-danger mx-5 mb-2" onClick={() => deleteTodo(id)}>Delete</Button>
        </div>  
    </div>  
  );
}

export default TodoCard;