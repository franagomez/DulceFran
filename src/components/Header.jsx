import { NavLink } from "react-router";
import { totalUnidadesCarrito } from "../data/carrito";

export function Header({ carrito, sesion, cerrarSesion }) {
  const totalCarrito = totalUnidadesCarrito(carrito);

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            DulceFran 🍩
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menuPrincipal"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="menuPrincipal">
            <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">Inicio</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/productos">Productos</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/blog">Blog</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
              </li>

              {sesion ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link">Hola, {sesion.nombre}</span>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={cerrarSesion}>
                      Cerrar sesión
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Iniciar sesión</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/registro">Registrarse</NavLink>
                  </li>
                </>
              )}

              <li className="nav-item">
                <NavLink className="nav-link" to="/carrito">
                  Carrito 🛒 ({totalCarrito})
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}