import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const q = query(
          collection(db, "messages"),
          orderBy("createdAt"),
          limit(50)
        );
    
        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
          let messages = [];
          QuerySnapshot.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id });
          });
          setMessages(messages);
        });
        return () => unsubscribe;
      }, []);

    return (
        <ul>
        {users.map(user => (
            <li key={user.id}>{user.name}</li>
        ))}
        </ul>
    );
}

export default UserList;