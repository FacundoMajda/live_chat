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
  Logger.info("Cliente conectado");

  //cuando escuchemos el siguiente evento
  //'mensaje'.
  //vamos a recibir datos del frontend y vamos a mostrarlos (en el backend)
  //'data' es un mensaje

  // Manejo del evento "Mensaje"
  socket.on("Mensaje", (data) => {
    // Primer evento "Mensaje": recibir datos del frontend y mostrarlos en el backend
    Logger.info("Data: ", data);
    console.log(data);

    //una vez tenemos el mensaje, podemos enviar un nuevo mensaje
    //además el socket que se ha comunicado/enviado el msj
    //este va a emitir un evento mensaje a todos los clientes conectados
    socket.broadcast.emit("Mensaje", data); //segundo evento mensaje

    //Estos eventos no son los mismos
    //el primer evento 'Mensaje' es lo que el backend escucha del cliente.
    //el segundo evento 'Mensaje' es lo que el backend envía al cliente.
  });
});

//Middlewares
app.use(cors());
app.use(morgan("dev"));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

// Manejo de errores
app.use((err, req, res, next) => {
  // Registrar el error en el logger
  Logger.error(err.stack);
  res.status(500).send("Error interno del servidor");
});
//test
// Logger.info("Este es un mensaje de información.");
// Logger.error("Este es un mensaje de error.");
server.listen(PORT, () => {
  Logger.info(`Servidor en ejecución en: `);

  Logger.http(`http://localhost:${PORT}`);
  
  //TODO: Conectar a la base de datos MongoDB
  // connectToMongoDB();
});
