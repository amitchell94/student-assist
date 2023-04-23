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

  return (
    <div className="text-center">
        <h1 className="mx-auto my-5">Financial Deadline List</h1>
        <div className="row mx-5 d-flex justify-content-center">
            {finances?.map((finance) => (
              <FinanceCard title={finance.title} amount={finance.amount} date={finance.date} />
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