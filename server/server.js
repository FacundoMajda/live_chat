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

import Logger from "./src/loaders/logger.js";

const PORT = process.env.PORT || 8080;
const app = express();
//servidor http
const server = http.createServer(app);
//servidor websocket
//se agrega cors para permitir origenes cruzados
const io = new SocketServer(server, {
  cors: { origin: process.env.FRONTEND_URL || "http://localhost:5173" },
});

//evento io=websocket
//'on' = cuando pase algo
//cuando pase una conexion:
io.on("connection", (socket) => {
  // console.log("Cliente conectado");
  Logger.info("Cliente conectado"),
    () => {
      console.log("Cliente conectado");
    };
  //cuando escuchemos el siguiente evento
  //'mensaje'.
  //vamos a recibir datos del frontend y vamos a mostrarlos (en el backend)
  //'data' es un mensaje
  socket.on("Mensaje", (data) => {
    //primer evento mensaje
    Logger.info("Data: ", data),
      () => {
        console.log(data);
      };
    //una vez tenemos el mensaje, podemos enviar un nuevo mensaje
    //además el socket que se ha comunicado/enviado el msj
    //este va a emitir un evento mensaje a todos los clientes conectados
    socket.broadcast.emit("Mensaje", data); //segundo evento mensaje

    //Estos eventos no son los mismos
    //el primer evento 'Mensaje' es lo que el backend escucha del cliente.
    //el segundo evento 'Mensaje' es lo que el backend envía al cliente.
  });
});

app.get("/socket.io", (req, res) => {});

//test
// Logger.info("Este es un mensaje de información.");
// Logger.error("Este es un mensaje de error.");
server.listen(PORT, () => {
  Logger.info(`Servidor en ejecución en: `);

  Logger.http(`http://localhost:${PORT}`);
  // connectToMongoDB();
});
