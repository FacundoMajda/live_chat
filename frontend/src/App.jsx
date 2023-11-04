//se utiliza fontawesome para svg ! del parrafo de 'error'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";
// Comunicación con el backend
// Configurado previamente en 'vite.config.js'
const socket = io("/");

//ciclo de vida de un componente
const App = () => {
  const [Mensaje, setMensaje] = useState("");
  const [Mensajes, setMensajes] = useState([]);
  const [Error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar si el campo de mensaje está vacío
    if (Mensaje.trim() === "") {
      setError("El mensaje no puede estar vacío");
      return;
    }

    // Enviar datos al backend
    // Evento 'Mensaje' y valor 'Mensaje' definido arriba en el useState
    socket.emit("Mensaje", Mensaje);

    // Limpiar el campo de mensaje después de enviarlo
    setMensaje("");
    setError("");
  };

  useEffect(() => {
    // Escuchar el evento 'Mensaje' del backend
    socket.on("Mensaje", (Mensaje) => {
      console.log(Mensaje);
      // Agregar el nuevo mensaje al estado de mensajes
      setMensajes([...Mensajes, Mensaje]);
    });

    // Manejar errores de conexión con el backend
    socket.on("connect_error", (error) => {
      setError("Error de conexión con el servidor");
    });

    // Limpiar el estado de error cuando se establece la conexión con el backend
    socket.on("connect", () => {
      setError("");
    });

    // Limpiar los listeners cuando el componente se desmonta
    return () => {
      socket.off("Mensaje");
      socket.off("connect_error");
      socket.off("connect");
    };
  }, [Mensajes]);

  return (
    <div className="container">
      <h1>Live Chat!</h1>

      <form onSubmit={handleSubmit} action="">
        <input
          type="text"
          placeholder="Ingresa tu mensaje"
          value={Mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>

      <ul>
        {Mensajes.map((Mensaje, index) => (
          <li key={index}>{Mensaje}</li>
        ))}
      </ul>

      {Error && (
        <div className="errors">
          <p>
            {Error}
            <FontAwesomeIcon icon={faExclamationCircle} />
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
