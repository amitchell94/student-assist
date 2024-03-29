import React from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  return (
    <div
      className={`chat-bubble ${message.uid === user.uid ? "right" : ""}`}>
      <div className="chat-bubble__right">
        <p className="user-name">{message.name}</p>
        <p className="user-message">{message.text}</p>
        <p className="user-message text-muted">{message.createdAt === null ? "" : message.createdAt.toDate().toLocaleTimeString("en-US")}</p>
      </div>
    </div>
  );
};

export default Message;
