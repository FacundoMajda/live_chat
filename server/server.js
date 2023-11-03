// :) asd
import express from "express";
import cors from 'cors'
import { CorsOptions } from "cors";
import http from "http";
import { Server as SocketServer } from "socket.io";
import { Morgan } from "morgan";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

server.listen(3000);
console.log("listening on port 3000");
