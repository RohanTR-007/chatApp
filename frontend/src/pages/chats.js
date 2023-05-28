import React, { useEffect, useState } from "react";
import axios from "axios";
// import from "react";

const Chats = () => {
  const [chats, setchat] = useState([]);
  const fetchchat = async () => {
    try {
      const data = (await axios.get("/chats")).data;
      setchat(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchchat();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default Chats;
