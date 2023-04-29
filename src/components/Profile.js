
import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  onSnapshot,
  where,
  limit,
  doc,
  getDoc
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
    const [users, setUsers] = useState([]);
    const [course, setCourse] = useState(null);
    const [subscriptions, setSubscriptions] = useState([]);
    const { id } = useParams();

    // useEffect(() => {
    //     const qUsers = query(
    //         collection(db, "users"));
    
    //     const unsubscribeUsers = onSnapshot(qUsers, (QuerySnapshot) => {
    //       let usrs = [];
    //       QuerySnapshot.forEach((doc) => {
    //         if (doc.id !== auth.currentUser.uid.toString()) {
    //         usrs.push({ ...doc.data(), id: doc.id });
    //         }
    //       });
    //       setUsers(usrs);
    //     });

    //     const courseRef = doc(db, "courses", id);
    //     getDoc(courseRef).then((doc) => {
    //         if (doc.exists()) {
    //             setCourse(doc.data());  
    //         } else {
    //             setCourse(null); 
    //         }
    //     });

    //     const qSubs = query(
    //       collection(db, "subscriptions"), 
    //       where("courseId", "==", id));

    //   const unsubscribeSubs = onSnapshot(qSubs, (QuerySnapshot) => {
    //     let subs = [];
    //     QuerySnapshot.forEach((doc) => {
    //       subs.push({ ...doc.data(), id: doc.id });
    //     });
    //     console.log(subs)
    //     setSubscriptions(subs);
    //   });

    //     return () => {
    //         // unsubscribeCourse();
    //         unsubscribeSubs();
    //         unsubscribeUsers();
    //     };
    //   }, []);

      const subscribedUsers = users.filter((user) => {
        return subscriptions.some((sub) => {
            return sub.uid === user.id;
        });
    });

    return (
        <div className="mx-5 mt-3 row">
            <div className="text-center">
                <h1 className="mt-2 mb-5">Profile Information</h1>
                <h3 className="my-2">Name:</h3>
                <h2 className="mt-2 mb-5">{auth.currentUser.displayName}</h2>
                <h3 className="my-2">Email:</h3>
                <h2 className="mt-2 mb-5">{auth.currentUser.email}</h2>
<p>To change your details please do so through your Google account.</p>
            </div>
        </div>
    );
}

export default Profile;