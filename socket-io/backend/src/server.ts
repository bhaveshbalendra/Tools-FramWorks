import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
import { dbConnect } from "./config/db";

dbConnect();

const app: Application = express();
const httpServer = http.createServer(app);

const PORT = 8000;
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected", socket.id);
});

httpServer.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
