import { Server } from "socket.io";
let io;
const createSocketServer = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PATCH", "DELETE"],
    },
  });

  return io;
};

export default createSocketServer;