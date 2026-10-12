import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Productos } from "./pages/Productos";
import { ProductoDetalle } from "./pages/ProductoDetalle";
import { Carrito } from "./pages/Carrito";
import { Registro } from "./pages/Registro";
import { Login } from "./pages/Login";
import { obtenerProductos } from "./data/productos";
import {
  obtenerCarrito,
  guardarCarrito,
  agregarAlCarrito as agregarAlCarritoData,
  cambiarCantidad as cambiarCantidadData,
  eliminarDelCarrito as eliminarDelCarritoData,
} from "./data/carrito";
import {
  obtenerSesion,
  iniciarSesion as iniciarSesionData,
  cerrarSesion as cerrarSesionData,
} from "./data/usuarios";
import "./App.css";

function App() {
  const [productos] = useState(() => obtenerProductos());
  const [carrito, setCarrito] = useState(() => obtenerCarrito());

  useEffect(() => {
    guardarCarrito(carrito);
  }, [carrito]);

  const [sesion, setSesion] = useState(() => obtenerSesion());

  function iniciarSesionApp(correo, contrasena) {
    const resultado = iniciarSesionData(correo, contrasena);
    if (resultado.ok) {
      setSesion(resultado.sesion);
    }
    return resultado;
  }

  function cerrarSesionApp() {
    cerrarSesionData();
    setSesion(null);
  }

  function agregarAlCarritoApp(codigo, cantidad) {
    setCarrito((carritoActual) => agregarAlCarritoData(carritoActual, codigo, cantidad));
  }

  function cambiarCantidadApp(codigo, nuevaCantidad) {
    setCarrito((carritoActual) => cambiarCantidadData(carritoActual, codigo, nuevaCantidad));
  }

  function eliminarDelCarritoApp(codigo) {
    setCarrito((carritoActual) => eliminarDelCarritoData(carritoActual, codigo));
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
          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                productos={productos}
                cambiarCantidad={cambiarCantidadApp}
                eliminarDelCarrito={eliminarDelCarritoApp}
              />
            }
          />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login iniciarSesionApp={iniciarSesionApp} />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;