import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { obtenerProductos } from "./data/productos";
import { obtenerCarrito, guardarCarrito } from "./data/carrito";
import { obtenerSesion, cerrarSesion as cerrarSesionData } from "./data/usuarios";
import "./App.css";

function App() {
  // Productos: se cargan una sola vez al abrir la app.
  const [productos] = useState(() => obtenerProductos());

  // Carrito: se carga desde localStorage al abrir la app.
  const [carrito, setCarrito] = useState(() => obtenerCarrito());

  // Cada vez que "carrito" cambia, se guarda solo en localStorage.
  useEffect(() => {
    guardarCarrito(carrito);
  }, [carrito]);

  // Sesión activa (null si nadie ha iniciado sesión).
  const [sesion, setSesion] = useState(() => obtenerSesion());

  function cerrarSesionApp() {
    cerrarSesionData();
    setSesion(null);
  }

  return (
    <BrowserRouter>
      <Header carrito={carrito} sesion={sesion} cerrarSesion={cerrarSesionApp} />

      <main>
        <Routes>
          <Route path="/" element={<h1>Bienvenida a DulceFran 🍩</h1>} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;