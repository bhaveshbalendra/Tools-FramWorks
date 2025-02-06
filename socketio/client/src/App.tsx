/* eslint-disable react-hooks/exhaustive-deps */
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Container, TextField, Typography } from "@mui/material";
import { Message } from "./types";

function App() {
  const [socketUser, setSocketUser] = useState<Socket | null>(null);
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState<Message[]>([]);

  useEffect(() => {
    const socket = io("http://localhost:4000");
    socket.on("connect", () => {
      setSocketUser(socketUser);
      console.log("connected", socket.id);
    });

    socket.on("welcome", (m) => {
      console.log(m);
    });

    socket.on("receive-message", (message) => {
      setReceivedMessage([...receivedMessage, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
  };

  const handleMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    socket.emit("send-message", { room: "JLU5NhsBzcV89779AABJ", message });
  };
  return (
    <div>
      <Container>
        <Typography variant="h4">{socketUser?.id}</Typography>
        <form onSubmit={handleSubmit} method="post">
          <TextField
            onChange={handleMessage}
            label="message"
            variant="outlined"
            value={message}
          />
        </form>

        {receivedMessage && receivedMessage.map((m, i) => <p key={i}>{m}</p>)}
      </Container>
    </div>
  );
}
export default App;
