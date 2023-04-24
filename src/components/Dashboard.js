import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="text-center">
        <h1 className="mx-auto my-5">Student Dashboard</h1>
        <div className="row mx-5 d-flex justify-content-center">
            <div className="col-4 mb-5">
                <div className="card">
                    <h2 className="mt-5 card-title">Profile</h2>
                    <p className="mx-3 mb-5 mt-3 card-subtitle fs-5">Student personal information</p>
                </div>  
            </div>  
            <div className="col-4 mb-5">
                <Link to = "/chat" >
                    <div className="card">
                        <h2 className="mt-5 card-title">Student Interaction</h2>
                        <p className="mx-3 mb-5 mt-3 card-subtitle fs-5">Student to student interaction</p>
                    </div>  
                </Link>
            </div>  
            <div className="col-4 mb-5">
                <Link to = "/todos" >
                    <div className="card">
                        <h2 className="mt-5 card-title">My To-Do List</h2>
                        <p className="mx-3 mb-5 mt-3 card-subtitle fs-5">Assignment submission checklist</p>
                    </div>  
                </Link>
            </div>  
            <div className="col-4 mb-5">
                <div className="card">
                    <h2 className="mt-5 card-title">My courses</h2>
                    <p className="mx-3 mb-5 mt-3 card-subtitle fs-5">Registered Course Details</p>
                </div>  
            </div>  
            <div className="col-4 mb-5">
                <Link to = "/finances" >
                    <div className="card">
                        <h2 className="mt-5 card-title">Finances</h2>
                        <p className="mx-3 mb-5 mt-3 card-subtitle fs-5">Finance Manager</p>
                    </div>  
                </Link>
            </div>  
        </div>
    </div>
  );
}

export default Dashboard;