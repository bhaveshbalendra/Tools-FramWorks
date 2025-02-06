"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const PORT = 4000;
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server);
app.get("/", (req, res) => {
    res.send("Server Socket Io");
});
io.on("connection", (socket) => {
    console.log("User Connected");
    console.log("Id", socket.id);
});
app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});
