import { useState, useEffect } from "react";
import io from "socket.io-client";

// Comunicación con el backend
// Configurado previamente en 'vite.config.js' 
const socket = io("/");

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
    socket.on("Mensaje", (Mensaje) => {
      console.log(Mensaje);
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
    <div>
      <form onSubmit={handleSubmit} action="">
        <input
          type="text"
          placeholder="Ingresa tu mensaje"
          value={Mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
        <button>Enviar</button>
      </form>

      {Error && <p>{Error}</p>}

      <ul>
        {Mensajes.map((Mensaje, index) => (
          <li key={index}>{Mensaje}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;