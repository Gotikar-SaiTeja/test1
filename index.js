
const http = require("http");
const express = require("express");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Define namespaces
const complaintsNamespace = io.of("/complaints");
const chatNamespace = io.of("/chat");

app.use(express.static(path.join(__dirname, "public")));

complaintsNamespace.on("connection", (socket) => {
  // console.log(`User connected to the complaints namespace: ${socket.id}`);
  socket.on("join-complaint-room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });
  console.log(room)


  socket.on("new-complaint", (complaint, room) => {
    // Broadcast the new complaint to all connected clients in the specified room within the complaints namespace
    complaintsNamespace.to(room).emit("new-complaint", complaint);
  });

  // socket.on("new-complaint", (complaint) => {
  //   console.log(`new-compliant connected to the chat namespace: ${socket.id}`);

  //   // Broadcast the new complaint to all connected clients in the complaints namespace
  //   complaintsNamespace.emit("new-complaint", complaint);
  // });

  socket.on("disconnect", () => {
    console.log(`User disconnected from the complaints namespace: ${socket.id}`);
  });
});

chatNamespace.on("connection", (socket) => {
  console.log(`User connected to the chat namespace: ${socket.id}`);

  socket.on("join-chat-room", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  socket.on("chat-message", (message) => {
    // Broadcast the chat message to all connected clients in the chat namespace
    chatNamespace.emit("chat-message", message);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected from the chat namespace: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
const HOST = "192.168.29.89"; // Replace with the desired IP address
server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

