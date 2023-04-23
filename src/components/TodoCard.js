import React from "react";

const TodoCard= ({course, title, date}) => {
  return (
    <div className="col-4 mb-5">
        <div className="card">
            <h4 className="mt-5 card-title">{course}</h4>
            <h2 className="mt-2 card-title">{title}</h2>
            <p className="mx-3 mb-5 mt-3 card-subtitle fs-5">Due: {date}</p>
        </div>  
    </div>  
  );
}

export default TodoCard;