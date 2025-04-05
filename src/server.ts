import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

const users = new Map<string, string>();

io.on("connection", (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  // Log every event for debugging
  socket.onAny((event, ...args) => {
    console.log(`📨 Received event: ${event}`, args);
  });

  socket.on("register", (userId) => {
    const stringUserId = String(userId);
    users.set(stringUserId, socket.id);
    console.log(`✅ User ${stringUserId} registered with socket ID: ${socket.id}`);
    console.log("📌 Current Users:", Array.from(users.entries()));
  });

  socket.on("privateMessage", ({ receiverId, text, senderId, currenttime }) => {
    const stringReceiverId = String(receiverId);
    const stringSenderId = String(senderId);
    const stringCurrentTime = String(currenttime);

    console.log(`📩 Message from ${stringSenderId} to ${stringReceiverId}: "${text}" at ${stringCurrentTime}`);

    const receiverSocketId = users.get(stringReceiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("privateMessage", {
        text,
        senderId: stringSenderId,
        currenttime: stringCurrentTime,
      });
      console.log(`✅ Message delivered to User ${stringReceiverId} at ${stringCurrentTime}`);
    } else {
      console.log(`⚠️ User ${stringReceiverId} not found or offline.`);
    }
  });

  socket.on("disconnect", () => {
    let disconnectedUserId = "";
    users.forEach((value, key) => {
      if (value === socket.id) {
        disconnectedUserId = key;
        users.delete(key);
      }
    });

    console.log(`❌ User ${disconnectedUserId} disconnected`);
    console.log(`🛑 Socket disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
