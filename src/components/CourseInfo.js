import React, { useEffect, useRef, useState } from "react";
import {
    query,
    collection,
    onSnapshot,
    where,
    doc,
    getDoc
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { Link, useParams } from "react-router-dom";

const CourseInfo = () => {
    const [users, setUsers] = useState([]);
    const [course, setCourse] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const qUsers = query(
            collection(db, "users"));

        const unsubscribeUsers = onSnapshot(qUsers, (QuerySnapshot) => {
            let usrs = [];
            QuerySnapshot.forEach((doc) => {
                if (doc.id !== auth.currentUser.uid.toString()) {
                    usrs.push({ ...doc.data(), id: doc.id });
                }
            });
            setUsers(usrs);
        });

        const courseRef = doc(db, "courses", id);
        getDoc(courseRef).then((doc) => {
            if (doc.exists()) {
                setCourse(doc.data());
            } else {
                setCourse(null);
            }
        });

        const qSubs = query(
            collection(db, "subscriptions"),
            where("courseId", "==", id));

        const unsubscribeSubs = onSnapshot(qSubs, (QuerySnapshot) => {
            let subs = [];
            QuerySnapshot.forEach((doc) => {
                subs.push({ ...doc.data(), id: doc.id });
            });
            console.log(subs)
            setSubscriptions(subs);
        });

        return () => {
            unsubscribeSubs();
            unsubscribeUsers();
        };
    }, []);

    const subscribedUsers = users.filter((user) => {
        return subscriptions.some((sub) => {
            return sub.uid === user.id;
        });
    });

    return (
        <div className="mx-5 mt-3 row">
            <div className="text-center">
                <h1 className="my-2">{course ? course.code : ""}</h1>
                <h1 className="my-2">{course ? course.name : ""}</h1>
                <h6 className="my-3">Subscribed users:</h6>
            </div>

            <ul className="list-group col-5 mx-auto">
                {subscribedUsers.map(user => (<>
                    {<Link to={`/chat/${user.id}`} >
                        <li key={user.id} className="list-group-item">{user.name}</li>
                    </Link>}
                </>
                ))}
            </ul>
        </div>
    );
}

export default CourseInfo;