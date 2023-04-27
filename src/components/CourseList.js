import React, { useEffect, useState } from "react";
import {
    query,
    collection,
    orderBy,
    where,
    onSnapshot,
    limit,
    doc,
    deleteDoc,
    addDoc,
  } from "firebase/firestore";
  import { auth, db } from "../firebase";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";

const CourseList = () => {
    const [courses, setCourses] = useState([]);
    const [subscriptions, setSubscriptions] = useState([]);

    useEffect(() => {
        const qCourses = query(
            collection(db, "courses"));

        const unsubscribeCourse = onSnapshot(qCourses, (QuerySnapshot) => {
          let crss = [];
          QuerySnapshot.forEach((doc) => {
            crss.push({ ...doc.data(), id: doc.id });
          });
          setCourses(crss);
        });

        const qSubs = query(
          collection(db, "subscriptions"), 
          where("uid", "==", auth.currentUser.uid.toString()));

      const unsubscribeSubs = onSnapshot(qSubs, (QuerySnapshot) => {
        let subs = [];
        QuerySnapshot.forEach((doc) => {
          subs.push({ ...doc.data(), id: doc.id });
        });
        setSubscriptions(subs);
      });

        return () => {
          unsubscribeCourse();
          unsubscribeSubs();
        };
      }, []);

      const subscribe = async (id) => {
        const { uid } = auth.currentUser;
        await addDoc(collection(db, "subscriptions"), {
            courseId: id,
            uid: uid
        });
      };

      const subbedCourses = courses.filter((course) => {
        //returns true if course.id is in subscriptions
        return subscriptions.some((sub) => sub.courseId === course.id)
      });

      const unsubbedCourses = courses.filter((course) => {
        //returns true if course.id is not in subscriptions
        return !subscriptions.some((sub) => sub.courseId === course.id)
        });
    
  return (
    <div className="text-center">
        <h1 className="mx-auto my-5">Course List</h1>
        <div className="row mx-5 d-flex justify-content-center">
            {unsubbedCourses?.map((course) => (
                <CourseCard id={course.id} code={course.code} name={course.name} subscribe={subscribe} subscribable={true} />
            ))}
            {subbedCourses?.map((course) => (
                <CourseCard id={course.id} code={course.code} name={course.name} subscribe={subscribe} subscribable={false} />
            ))}
        </div>
        <h4 className="mx-auto my-2">Don't see your course here?</h4>
        <Link to="/courses/new">
            <Button variant="success" size="lg" className="mb-2">
                Add a new course
            </Button>
        </Link>
    </div>
  );
}

export default CourseList;