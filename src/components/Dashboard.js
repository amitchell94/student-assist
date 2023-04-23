import React from "react";

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
                <div className="card">
                    <h2 className="mt-5 card-title">Student Interaction</h2>
                    <p className="mx-3 mb-5 mt-3 card-subtitle fs-5">Student to student interaction</p>
                </div>  
            </div>  
            <div className="col-4 mb-5">
                <div className="card">
                    <h2 className="mt-5 card-title">My To-Do List</h2>
                    <p className="mx-3 mb-5 mt-3 card-subtitle fs-5">Assignment submission checklist</p>
                </div>  
            </div>  
            <div className="col-4 mb-5">
                <div className="card">
                    <h2 className="mt-5 card-title">My courses</h2>
                    <p className="mx-3 mb-5 mt-3 card-subtitle fs-5">Registered Course Details</p>
                </div>  
            </div>  
            <div className="col-4 mb-5">
                <div className="card">
                    <h2 className="mt-5 card-title">Finance</h2>
                    <p className="mx-3 mb-5 mt-3 card-subtitle fs-5">Finance Manager</p>
                </div>  
            </div>  
        </div>
    </div>
  );
}

export default Dashboard;