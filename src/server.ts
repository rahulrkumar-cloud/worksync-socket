// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const server = createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// app.use(cors());
// app.use(express.json());

// const users = new Map<string, string>();

// io.on("connection", (socket) => {
//   console.log(`🟢 User connected: ${socket.id}`);

//   // Log every event for debugging
//   socket.onAny((event, ...args) => {
//     console.log(`📨 Received event: ${event}`, args);
//   });

//   socket.on("register", (userId) => {
//     const stringUserId = String(userId);
//     users.set(stringUserId, socket.id);
//     console.log(`✅ User ${stringUserId} registered with socket ID: ${socket.id}`);
//     console.log("📌 Current Users:", Array.from(users.entries()));
//   });

//   socket.on("privateMessage", ({ receiverId, text, senderId, currenttime }) => {
//     const stringReceiverId = String(receiverId);
//     const stringSenderId = String(senderId);
//     const stringCurrentTime = String(currenttime);

//     console.log(`📩 Message from ${stringSenderId} to ${stringReceiverId}: "${text}" at ${stringCurrentTime}`);

//     const receiverSocketId = users.get(stringReceiverId);

//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("privateMessage", {
//         text,
//         senderId: stringSenderId,
//         currenttime: stringCurrentTime,
//       });
//       console.log(`✅ Message delivered to User ${stringReceiverId} at ${stringCurrentTime}`);
//     } else {
//       console.log(`⚠️ User ${stringReceiverId} not found or offline.`);
//     }
//   });

//   socket.on("disconnect", () => {
//     let disconnectedUserId = "";
//     users.forEach((value, key) => {
//       if (value === socket.id) {
//         disconnectedUserId = key;
//         users.delete(key);
//       }
//     });

//     console.log(`❌ User ${disconnectedUserId} disconnected`);
//     console.log(`🛑 Socket disconnected: ${socket.id}`);
//   });

//   // Handle initiating a call
//   socket.on("call-user", ({ to, offer }) => {
//     const targetSocketId = users.get(String(to));
//     if (targetSocketId) {
//       io.to(targetSocketId).emit("incoming-call", {
//         from: socket.id,
//         offer,
//       });
//     }
//   });

//   // Handle answering a call
//   socket.on("answer-call", ({ to, answer }) => {
//     io.to(to).emit("call-answered", {
//       from: socket.id,
//       answer,
//     });
//   });

//   // ICE candidate exchange
//   socket.on("ice-candidate", ({ to, candidate }) => {
//     io.to(to).emit("ice-candidate", {
//       from: socket.id,
//       candidate,
//     });
//   });


// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const server = createServer(app);


// // Prevent idle disconnections
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// app.use(cors());
// app.use(express.json());

// const users = new Map<string, string>();

// io.on("connection", (socket) => {
//   console.log(`🟢 User connected: ${socket.id}`);

//   socket.onAny((event, ...args) => {
//     console.log(`📨 Received event: ${event}`, args);
//   });

//   socket.on("register", (userId) => {
//     const stringUserId = String(userId);
//     users.set(stringUserId, socket.id);
//     console.log(`✅ User ${stringUserId} registered with socket ID: ${socket.id}`);
//     console.log("📌 Current Users:", Array.from(users.entries()));
//   });

//   // 💓 Heartbeat from client
//   socket.on("heartbeat", () => {
//     console.log(`💓 Heartbeat received from ${socket.id}`);
//   });


//   socket.on("privateMessage", ({ receiverId, text, senderId, currenttime }) => {
//     const stringReceiverId = String(receiverId);
//     const stringSenderId = String(senderId);
//     const stringCurrentTime = String(currenttime);

//     console.log(`📩 Message from ${stringSenderId} to ${stringReceiverId}: "${text}" at ${stringCurrentTime}`);

//     const receiverSocketId = users.get(stringReceiverId);

//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("privateMessage", {
//         text,
//         senderId: stringSenderId,
//         currenttime: stringCurrentTime,
//       });
//       console.log(`✅ Message delivered to User ${stringReceiverId} at ${stringCurrentTime}`);
//     } else {
//       console.log(`⚠️ User ${stringReceiverId} not found or offline.`);
//     }
//   });

//   socket.on("disconnect", (reason) => {
//     let disconnectedUserId = "";
//     users.forEach((value, key) => {
//       if (value === socket.id) {
//         disconnectedUserId = key;
//         users.delete(key);
//       }
//     });

//     console.log(`❌ User ${disconnectedUserId} disconnected`);
//     console.log(`🛑 Socket disconnected: ${socket.id}`);
//     console.log(`🔴 Disconnect reason: ${reason}`);
//   });

//   // Handle initiating a call
//   socket.on("call-user", ({ to, offer }) => {
//     const targetSocketId = users.get(String(to));
//     if (targetSocketId) {
//       io.to(targetSocketId).emit("incoming-call", {
//         from: socket.id,
//         offer,
//       });
//     }
//   });

//   // Handle answering a call
//   socket.on("answer-call", ({ to, answer }) => {
//     io.to(to).emit("call-answered", {
//       from: socket.id,
//       answer,
//     });
//   });

//   // ICE candidate exchange
//   socket.on("ice-candidate", ({ to, candidate }) => {
//     io.to(to).emit("ice-candidate", {
//       from: socket.id,
//       candidate,
//     });
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import dotenv from "dotenv";
// import { createAdapter } from "@socket.io/redis-adapter";
// import { createClient } from "redis";

// dotenv.config();

// const app = express();
// const server = createServer(app);

// // Socket.IO setup
// const io = new Server(server, {
//   cors: {
//     origin: "*", // Change to your frontend URL in production
//     methods: ["GET", "POST"],
//   },
// });

// app.use(cors());
// app.use(express.json());

// // 🔗 Redis Setup
// const redisUrl = process.env.REDIS_URL;

// if (!redisUrl) {
//   throw new Error("❌ REDIS_URL not set in environment variables.");
// }

// const pubClient = createClient({ url: redisUrl });
// const subClient = pubClient.duplicate();

// Promise.all([pubClient.connect(), subClient.connect()])
//   .then(() => {
//     io.adapter(createAdapter(pubClient, subClient));
//     console.log("✅ Redis adapter connected");
//   })
//   .catch((err) => {
//     console.error("❌ Redis connection failed:", err);
//   });

// // 🧠 User socket memory map (note: per instance, not shared)
// const users = new Map<string, string>();

// // 🔌 Socket.IO events
// io.on("connection", (socket) => {
//   console.log(`🟢 Connected: ${socket.id}`);

//   socket.on("register", (userId) => {
//     const uid = String(userId);
//     users.set(uid, socket.id);
//     console.log(`✅ Registered User ${uid} with Socket ID ${socket.id}`);
//     console.log("📌 Users Map:", Array.from(users.entries()));
//   });

//   socket.on("privateMessage", ({ receiverId, text, senderId, currenttime }) => {
//     const receiverSocketId = users.get(String(receiverId));
//     console.log(`📨 Message from ${senderId} to ${receiverId}: ${text}`);

//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("privateMessage", {
//         text,
//         senderId,
//         currenttime,
//       });
//       console.log(`✅ Delivered to ${receiverId}`);
//     } else {
//       console.log(`⚠️ ${receiverId} is offline or not registered.`);
//     }
//   });

//   socket.on("heartbeat", () => {
//     console.log(`💓 Heartbeat from ${socket.id}`);
//   });

//   socket.on("call-user", ({ to, offer }) => {
//     const targetSocketId = users.get(String(to));
//     if (targetSocketId) {
//       io.to(targetSocketId).emit("incoming-call", {
//         from: socket.id,
//         offer,
//       });
//     }
//   });

//   socket.on("answer-call", ({ to, answer }) => {
//     io.to(to).emit("call-answered", {
//       from: socket.id,
//       answer,
//     });
//   });

//   socket.on("ice-candidate", ({ to, candidate }) => {
//     io.to(to).emit("ice-candidate", {
//       from: socket.id,
//       candidate,
//     });
//   });

//   socket.on("disconnect", (reason) => {
//     let disconnectedUserId = "";
//     users.forEach((value, key) => {
//       if (value === socket.id) {
//         disconnectedUserId = key;
//         users.delete(key);
//       }
//     });
//     console.log(`❌ User ${disconnectedUserId} disconnected (${reason})`);
//   });
// });

// // 🚀 Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

// Load environment variables
dotenv.config();

const app = express();
const server = createServer(app);

// 🔗 Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*", // ⚠️ Update to your frontend URL in production
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

// 🔐 Redis Setup
const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("❌ REDIS_URL not set in environment variables.");
}

const pubClient = createClient({ url: redisUrl });
const subClient = pubClient.duplicate();

// Connect Redis
Promise.all([pubClient.connect(), subClient.connect()])
  .then(() => {
    io.adapter(createAdapter(pubClient, subClient));
    console.log("✅ Redis adapter connected");
  })
  .catch((err) => {
    console.error("❌ Redis connection failed:", err);
  });

// 🧠 In-memory user mapping
const users = new Map<string, string>();

// 🔌 Socket.IO Events
io.on("connection", (socket) => {
  console.log(`🟢 Connected: ${socket.id}`);

  socket.on("register", (userId) => {
    const uid = String(userId);
    users.set(uid, socket.id);
    console.log(`✅ Registered User ${uid} with Socket ID ${socket.id}`);
    console.log("📌 Users Map:", Array.from(users.entries()));
  });

  socket.on("privateMessage", ({ receiverId, text, senderId, currenttime }) => {
    const receiverSocketId = users.get(String(receiverId));
    console.log(`📨 Message from ${senderId} to ${receiverId}: ${text}`);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("privateMessage", {
        text,
        senderId,
        currenttime,
      });
      console.log(`✅ Delivered to ${receiverId}`);
    } else {
      console.log(`⚠️ ${receiverId} is offline or not registered.`);
    }
  });

  socket.on("heartbeat", () => {
    console.log(`💓 Heartbeat from ${socket.id}`);
  });

  socket.on("call-user", ({ to, offer }) => {
    const targetSocketId = users.get(String(to));
    if (targetSocketId) {
      io.to(targetSocketId).emit("incoming-call", {
        from: socket.id,
        offer,
      });
    }
  });

  socket.on("answer-call", ({ to, answer }) => {
    io.to(to).emit("call-answered", {
      from: socket.id,
      answer,
    });
  });

  socket.on("ice-candidate", ({ to, candidate }) => {
    io.to(to).emit("ice-candidate", {
      from: socket.id,
      candidate,
    });
  });

  socket.on("disconnect", (reason) => {
    let disconnectedUserId = "";
    users.forEach((value, key) => {
      if (value === socket.id) {
        disconnectedUserId = key;
        users.delete(key);
      }
    });
    console.log(`❌ User ${disconnectedUserId} disconnected (${reason})`);
  });
});

// 🚀 Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
