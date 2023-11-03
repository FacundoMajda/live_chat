import { useState, useEffect } from "react";
import io from "socket.io-client";

//comunicacion con el backend
//configurado previamente en 'vite.config.js'
const socket = io("/");

const App = () => {
  const [Mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //enviar datos al backend
    //evento 'mensaje' y valor 'mensaje' definido arriba en el usestate
    socket.emit("Mensaje", Mensaje);
  };

  useEffect(()=>{socket.on("Mensaje", Mensaje)=>{console.log(Mensaje)}})

  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <input
          type="text"
          placeholder="Ingresa tú mensaje"
          onChange={(e) => setMensaje}
        />
        <button>Enviar</button>
      </form>
    </div>
  );
};

export default App;
