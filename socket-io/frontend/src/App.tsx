import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:8000";

function App() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState(""); // Your ID
  const [friendId, setFriendId] = useState(""); // Friend's ID
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const newSocket: Socket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    newSocket.on("get-data", (data) => {
      setMessages(data);
    });

    newSocket.on("newMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const joinRoom = () => {
    if (socket && userId && friendId) {
      socket.emit("joinRoom", { userId, friendId });
      setIsJoined(true);
    }
  };

  const sendMessage = () => {
    if (socket && input && userId && friendId) {
      socket.emit("sendMessage", { userId, friendId, message: input });
      setInput("");
    }
  };

  return (
    <div>
      <h1>Socket.IO Private Chat</h1>
      {!isJoined ? (
        <div>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Your ID (e.g., alice)"
          />
          <input
            type="text"
            value={friendId}
            onChange={(e) => setFriendId(e.target.value)}
            placeholder="Friend's ID (e.g., bob)"
          />
          <button onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <div>
          <p>Chatting with {friendId}</p>
          <div>
            {messages.map((msg, index) => (
              <p key={index}>{msg}</p>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default App;
