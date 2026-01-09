import { Server } from "socket.io";

let io = null;

export const initSocket = (server) => {
  if (io) return io; // prevent re-init

  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });

  console.log("🟢 Socket.IO initialized");

  return io;
};

export const getIO = () => {
  if (!io) {
    console.error("❌ Socket.IO NOT initialized");
    return null;
  }
  return io;
};
