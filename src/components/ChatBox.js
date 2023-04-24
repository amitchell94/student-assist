import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  where,
  and,
  or,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { useParams } from "react-router-dom";

const ChatBox = ({match}) => {
  const [messages, setMessages] = useState([]);
  const scroll = useRef();
  const { id } = useParams();

  useEffect(() => {
    const messagesQ = query(
      collection(db, "messages"),

      or(
        and(where("toId", "==", id.toString()),
        where("uid", "==", auth.currentUser.uid.toString())),
        and(where("uid", "==", id.toString()),
        where("toId", "==", auth.currentUser.uid.toString()))
      ),
      limit(50)
    );

    const unsubscribe = onSnapshot(messagesQ, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = messages?.sort((a, b) => {
        // Assuming "createdAt" is a timestamp or a string in ISO 8601 format
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateA - dateB;
      });
      setMessages(sortedMessages);
    });
    return () => unsubscribe;
  }, []);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls dowwn to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} toId={id} />
    </main>
  );
};

export default ChatBox;
