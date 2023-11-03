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
  cors: { origin: process.env.FRONTEND_URL || "http://localhost:5173" },
});

//evento io=websocket
//'on' = cuando pase algo

//cuando pase una conexion:
io.on("conecction", (socket) => {
  console.log("Cliente conectado");

  //cuando escuchemos el siguiente evento
  //'mensaje'.
  //vamos a recibir datos del frontend y vamos a mostrarlos en el backend
 //'data' es un mensaje
  socket.on("Mensaje", (data) => { //primer evento mensaje
    console.log(data);
    //una vez tenemos el mensaje, podemos enviar un nuevo mensaje
    //ademas el socket que se ha  comunicado/enviado el msj
    //este va a emitir un evento mensaje a todos los clientes conectados
    socket.broadcast.emit('Mensaje', data)//segundo evento mensaje

//Estos eventos no son los mismos
//el primer evento 'Mensaje' es lo que el backend escucha del cliente.
//el segundo evento 'Mensaje' es lo que el backend envia al cliente.




  });



});

server.listen(PORT);
console.log("escuchando en el puerto: ", PORT);
