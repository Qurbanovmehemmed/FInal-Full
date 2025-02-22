import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { MdOutlineMessage } from "react-icons/md";
import "./Chat.css";

const socket = io("http://localhost:3000");

const Chat = () => {
  const { user } = useSelector((state) => state.user);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        senderId: user?.existUser._id,
        senderUsername: user.existUser.username,
        content: message,
      };

      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      {/* Chat Icon */}
      <button className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
        <MdOutlineMessage size={24} />
      </button>

      {/* Chat Sidebar */}
      <div className={`chat-sidebar ${isOpen ? "open" : ""}`}>
        <div className="chat-header">
          <h3>Live Chat</h3>
          <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
        </div>
        <div className="chat-body">
          {messages.map((msg, index) => {
            const isOwnMessage = msg.senderId?.toString() === user?.existUser?._id?.toString();
            return (
              <div key={index} className={`message ${isOwnMessage ? "own-message" : "other-message"}`}>
                <p>
                  <strong>
                    {isOwnMessage ? "Siz" : msg.senderUsername || "Naməlum istifadəçi"}:
                  </strong>{" "}
                  {msg.content}
                </p>
              </div>
            );
          })}
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown} // ENTER düyməsini dinləyir
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
