// // index.js
// const http = require("http");
// const express = require("express");
// const path = require("path");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, "public")));

// // WebSocket (Socket.IO) connection
// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   // Listen for incoming messages
//   socket.on("user-message", (message) => {
//     // Broadcast the message to all connected clients, including the sender
//     io.emit("user-message", message);
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

// // Start the server on port 8081
// const PORT = process.env.PORT || 8081;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);

// io.on('connection', function (socket) {
//   console.log('Connected');

//   socket.on('msg_from_client', function (from, to, msg) {
//     console.log('Message from ' + from + ' to ' + to + ': ' + msg);
    
//     // Emit the message to the specified "to" client
//     io.to(to).emit('msg_to_client', from, msg);
//   });

//   socket.on('disconnect', function (msg) {
//     console.log('Disconnected');
//   });
// });

// http.listen(3000, function () {
//   console.log('Listening to port 3000');
// });



// const http = require("http");
// const express = require("express");
// const path = require("path");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, "public")));

// // WebSocket (Socket.IO) connection
// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   // Listen for incoming user messages
//   socket.on("user-message", (message) => {
//     // Broadcast the user message to all connected clients
//     io.emit("user-message", message);
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

// // Start the server on port 8081
// const PORT = process.env.PORT || 8081;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const http = require("http");
// const express = require("express");
// const path = require("path");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// app.use(express.static(path.join(__dirname, "public")));

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on("new-complaint", (complaint) => {
//     // Broadcast the new complaint to all connected clients
//     io.emit("new-complaint", complaint);
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

// const PORT = process.env.PORT || 5000;
// const HOST = "192.168.29.89"; // Replace with the desired IP address
// server.listen(PORT, HOST, () => {
//   console.log(`Server is running on http://${HOST}:${PORT}`);
// });

// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);

// });
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// const http = require("http");
// const express = require("express");
// const path = require("path");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// app.use(express.static(path.join(__dirname, "public")));

// io.on("connection", (socket) => {
//   console.log(`User connected: ${socket.id}`);

//   socket.on("new-complaint", (complaint) => {
//     // Broadcast the new complaint to all connected clients
//     io.emit("new-complaint", complaint);
//   });

//   socket.on("disconnect", () => {
//     console.log(`User disconnected: ${socket.id}`);
//   });
// });

// const PORT = process.env.PORT || 5000;
// const HOST = "192.168.29.89"; // Replace with the desired IP address
// server.listen(PORT, HOST, () => {
//   console.log(`Server is running on http://${HOST}:${PORT}`);
// });

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

