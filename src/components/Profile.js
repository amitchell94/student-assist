
import React from "react";
import { auth, db } from "../firebase";

const Profile = () => {

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