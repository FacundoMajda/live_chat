// :) asd
import "dotenv/config";
//debemos crear un servidor socket
//renombrado para que sea mas descriptivo como 'socketserver'
import { Server as SocketServer } from "socket.io";
//cuando usamos express creamos un servidor http, pero esto no es compatible con sockets
import express from "express";
import http from "http";

import morgan from "morgan";
import cors from "cors";

const PORT = process.env.PORT || 666;

const app = express();
//servidor http
const server = http.createServer(app);
//servidor websocket

//se agrega cors para permitir origenes cruzados
const io = new SocketServer(server, {
  cors: { origin: process.env.FRONTEND_URL ||'http://localhost:5173' },
});

//evento io=websocket
//'on' = cuando pase algo

//cuando pase una conexion:
io.on("conecction", (socket) => {
  console.log("Cliente conectado");
});

server.listen(PORT);
console.log("escuchando en el puerto: ", PORT);
