// :) asd
import express from "express";
import http from "http";

//esta linea ...
import { Server as SocketServer } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new SocketServer();

app.listen(3000);
console.log("listening on port 3000");
