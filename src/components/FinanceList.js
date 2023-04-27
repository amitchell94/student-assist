import React, { useEffect, useState } from "react";
import {
    query,
    collection,
    orderBy,
    where,
    onSnapshot,
    limit,
    deleteDoc,
    doc,
  } from "firebase/firestore";
  import { auth, db } from "../firebase";
    import TodoCard from "./TodoCard";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FinanceCard from "./FinanceCard";

const FinanceList = () => {
    const [finances, setFinances] = useState([]);

    useEffect(() => {

        const q = query(
            collection(db, "finances"), 
            where("uid", "==", auth.currentUser.uid.toString()));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          let fins = [];
          QuerySnapshot.forEach((doc) => {
            fins.push({ ...doc.data(), id: doc.id });
          });
          setFinances(fins);
        });
        return () => unsubscribe;
      }, []);

      const deleteFinance = async (id) => {
        if (window.confirm("Are you sure you want to mark this deadline as complete and remove it from the list?")){ 
            const todoRef = doc(db, "finances", id);
            await deleteDoc(todoRef);
        }
      };

  return (
    <div className="text-center">
        <h1 className="mx-auto my-5">Financial Deadline List</h1>
        <div className="row mx-5 d-flex justify-content-center">
            {finances?.map((finance) => (
              <FinanceCard id={finance.id} title={finance.title} amount={finance.amount} date={finance.date} deleteFinance={deleteFinance} />
            ))}
        </div>
        <Link to="/finances/new">
            <Button variant="primary" size="lg">
                Add new financial deadline
            </Button>
        </Link>
    </div>
  );
}

export default FinanceList;