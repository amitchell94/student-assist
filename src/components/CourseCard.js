import { deleteDoc } from "firebase/firestore";
import React from "react";
import { Button } from "react-bootstrap";

const CourseCard= ({id, code, name, subscribe, subscribable }) => {
 

  return (
    <div className="col-4 mb-5">
        <div className="card">
            <h4 className="mt-5 card-title">{code}</h4>
            <h2 className="mt-2 mb-5 card-title">{name}</h2>
            <Button className="btn-primary mx-5 mb-2" hidden={!subscribable} onClick={() => subscribe(id)}>Subscribe</Button>
            <h6 className="text-muted" hidden={subscribable}>Subscribed</h6>
        </div>  
    </div>  
  );
}

export default CourseCard;