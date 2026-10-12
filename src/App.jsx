import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Productos } from "./pages/Productos";
import { ProductoDetalle } from "./pages/ProductoDetalle";
import { obtenerProductos } from "./data/productos";
import { obtenerCarrito, guardarCarrito, agregarAlCarrito as agregarAlCarritoData } from "./data/carrito";
import { obtenerSesion, cerrarSesion as cerrarSesionData } from "./data/usuarios";
import "./App.css";

function App() {
  const [productos] = useState(() => obtenerProductos());
  const [carrito, setCarrito] = useState(() => obtenerCarrito());

  useEffect(() => {
    guardarCarrito(carrito);
  }, [carrito]);

  const [sesion, setSesion] = useState(() => obtenerSesion());

  function cerrarSesionApp() {
    cerrarSesionData();
    setSesion(null);
  }

  function agregarAlCarritoApp(codigo, cantidad) {
    setCarrito((carritoActual) => agregarAlCarritoData(carritoActual, codigo, cantidad));
  }

  return (
    <BrowserRouter>
      <Header carrito={carrito} sesion={sesion} cerrarSesion={cerrarSesionApp} />

      <main>
        <Routes>
          <Route path="/" element={<h1>Bienvenida a DulceFran 🍩</h1>} />
          <Route path="/productos" element={<Productos productos={productos} />} />
          <Route
            path="/productos/:codigo"
            element={<ProductoDetalle productos={productos} agregarAlCarrito={agregarAlCarritoApp} />}
          />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;