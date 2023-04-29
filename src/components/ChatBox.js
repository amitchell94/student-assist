import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
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

const ChatBox = () => {
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
      let mesgs = [];
      QuerySnapshot.forEach((doc) => {
        mesgs.push({ ...doc.data(), id: doc.id });
      });
      const sortedMessages = mesgs?.sort((a, b) => {
        const dateA = a.createdAt === null ? "" : a.createdAt.toDate();
        const dateB = b.createdAt === null ? "" : b.createdAt.toDate();

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
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} toId={id} />
    </main>
  );
};

export default ChatBox;
