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
    const handleMensaje = (mensaje) => {
      console.log(mensaje);
      setMensajes((mensajes) => [...mensajes, mensaje]);
    };

    const handleConnectError = (error) => {
      setError("Error de conexión con el servidor");
    };

    const handleConnect = () => {
      setError("");
    };

    socket.on("Mensaje", handleMensaje);
    socket.on("connect_error", handleConnectError);
    socket.on("connect", handleConnect);
//dismount
    return () => {
      socket.off("Mensaje", handleMensaje);
      socket.off("connect_error", handleConnectError);
      socket.off("connect", handleConnect);
    };
  }, []);

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
