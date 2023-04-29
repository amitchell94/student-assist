import React, { useEffect, useState } from "react";
import {
  query,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";

const MyCourses = () => {
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

  const subbedCourses = courses.filter((course) => {
    //returns true if course.id is in subscriptions
    return subscriptions.some((sub) => sub.courseId === course.id)
  });

  console.log(subbedCourses)
  return (
    <div className="text-center">
      <h1 className="mx-auto my-5">My Courses</h1>
      <div className="row mx-5 d-flex justify-content-center">
        {subbedCourses?.map((course) => (
          <CourseCard id={course.id} code={course.code} name={course.name} subscribable={false} />
        ))}
      </div>
      <Link to="/courses/">
        <Button variant="primary" size="lg">
          Subscribe to a course
        </Button>
      </Link>
    </div>
  );
}

export default MyCourses;