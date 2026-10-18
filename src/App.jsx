import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { RutaProtegida } from "./components/RutaProtegida";
import { Home } from "./pages/Home";
import { Productos } from "./pages/Productos";
import { ProductoDetalle } from "./pages/ProductoDetalle";
import { Carrito } from "./pages/Carrito";
import { Registro } from "./pages/Registro";
import { Login } from "./pages/Login";
import { Nosotros } from "./pages/Nosotros";
import { Blog } from "./pages/Blog";
import { BlogDetalle1 } from "./pages/BlogDetalle1";
import { BlogDetalle2 } from "./pages/BlogDetalle2";
import { Contacto } from "./pages/Contacto";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminHome } from "./pages/admin/AdminHome";
import { AdminProductos } from "./pages/admin/AdminProductos";
import { AdminUsuarias } from "./pages/admin/AdminUsuarias";
import { AdminPedidos } from "./pages/admin/AdminPedidos";
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
  const [productos, setProductos] = useState(() => obtenerProductos());
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

  function vaciarCarritoApp() {
    setCarrito([]);
  }

  return (
    <BrowserRouter>
      <Header carrito={carrito} sesion={sesion} cerrarSesion={cerrarSesionApp} />

      <main>
        <Routes>
          <Route path="/" element={<Home productos={productos} />} />
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
                vaciarCarrito={vaciarCarritoApp}
                sesion={sesion}
              />
            }
          />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login iniciarSesionApp={iniciarSesionApp} />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/5-datos-curiosos" element={<BlogDetalle1 />} />
          <Route path="/blog/pack-perfecto-evento" element={<BlogDetalle2 />} />
          <Route path="/contacto" element={<Contacto />} />

          <Route
            path="/admin"
            element={
              <RutaProtegida sesion={sesion} rolesPermitidos={["Administrador", "Vendedor"]}>
                <AdminLayout sesion={sesion} cerrarSesion={cerrarSesionApp} />
              </RutaProtegida>
            }
          >
            <Route index element={<AdminHome sesion={sesion} productos={productos} />} />
            <Route
              path="productos"
              element={<AdminProductos sesion={sesion} productos={productos} setProductos={setProductos} />}
            />
            <Route path="usuarias" element={<AdminUsuarias sesion={sesion} />} />
            <Route path="pedidos" element={<AdminPedidos />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;