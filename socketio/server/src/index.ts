import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import { Message } from "./types";

const PORT = 4000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.get("/", (req, res) => {
  res.send("Server Socket Io");
});

io.on("connection", (socket) => {
  console.log("User Connected");
  console.log("Id", socket.id);
  //   socket.broadcast.emit("welcome", `Welcome to the server ${socket.id}`);
  socket.on("disconnect", () => {
    console.log("User Disconnect", socket.id);
  });

  socket.on("send-message", ({ room, message }: Message) => {
    console.log(room, message);
    io.to(room).emit("receive-message", message);
  });
});

server.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
