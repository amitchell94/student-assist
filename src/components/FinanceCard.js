import React from "react";
import { Button } from "react-bootstrap";

const FinanceCard = ({id, title, amount, date, deleteFinance}) => {
  return (
    <div className="col-4 mb-5">
        <div className="card">
            <h4 className="mt-5 card-title">{title}</h4>
            <h2 className="mt-2 card-title">${amount}</h2>
            <p className="mx-3 mb-2 mt-3 card-subtitle fs-5">Due: {date}</p>
            <Button className="btn-danger mx-5 mb-2" onClick={() => deleteFinance(id)}>Mark as complete</Button>
        </div>  
    </div>  
  );
}

export default FinanceCard;