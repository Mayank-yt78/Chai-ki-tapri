const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let onlineUsers = 0;

io.on("connection", (socket) => {
  onlineUsers++;

  console.log(`User connected: ${socket.id}`);
  console.log(`Online users: ${onlineUsers}`);

  io.emit("audienceCount", onlineUsers);

  socket.on("disconnect", () => {
    onlineUsers--;

    console.log(`User disconnected: ${socket.id}`);
    console.log(`Online users: ${onlineUsers}`);

    io.emit("audienceCount", onlineUsers);
  });
});

app.get("/", (req, res) => {
  res.send("Chai Ki Tapri server is running ☕");
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
}); 