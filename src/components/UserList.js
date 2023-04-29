import React, { useEffect, useRef, useState } from "react";
import {
    query,
    collection,
    onSnapshot
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { Link } from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const q = query(
            collection(db, "users"));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let usrs = [];
            QuerySnapshot.forEach((doc) => {
                if (doc.id !== auth.currentUser.uid.toString()) {
                    usrs.push({ ...doc.data(), id: doc.id });
                }
            });
            setUsers(usrs);
        });
        return () => unsubscribe;
    }, []);

    return (
        <div className="mx-5 mt-3 row">
            <div className="text-center">
                <h1 className="my-2">User List</h1>
                <h6 className="my-3"> Click a name to start a conversation</h6>
            </div>

            <ul className="list-group col-5 mx-auto">
                {users.map(user => (<>
                    {<Link to={`/chat/${user.id}`} >
                        <li key={user.id} className="list-group-item">{user.name}</li>
                    </Link>}
                </>
                ))}
            </ul>
        </div>
    );
}

export default UserList;