import React, { useEffect, useState } from "react";
  import { auth, db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NewFinance = () => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState("");
    const navigate = useNavigate();

    const newFinance = async (event) => {
        event.preventDefault();
        if (title.trim() === "") {
          alert("Enter valid title");
          return;
        }
        if (amount < 0) {
            alert("Enter valid amount");
            return;
        }
        if (date.trim() === "") {
            alert("Enter valid date");
            return;
        }

        const { uid } = auth.currentUser;
        await addDoc(collection(db, "finances"), {
            title,
            amount,
            date,
            createdAt: serverTimestamp(),
            uid,
        });
        navigate("/finances");

      };

  return (
    <form onSubmit={(event) => newFinance(event)} className="new-finance input-group">

        <div className="row col-6 mx-auto">
        <h1 className="text-center mx-auto mt-3">Add New Financial Deadline</h1>
        <div className="col-12 mx-auto mb-4">
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
        <label htmlFor="amountInput" >
        Amount
        </label>
        <input
        id="amountInput"
        name="amountInput"
        type="number"
        className="form-input__input form-control"
        placeholder="enter amount..."
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
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

export default NewFinance;