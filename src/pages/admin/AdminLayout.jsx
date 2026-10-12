import { NavLink, Outlet } from "react-router";

export function AdminLayout({ sesion, cerrarSesion }) {
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 mb-0">Panel de administración</h1>
        <div>
          <span className="me-3">Hola, {sesion.nombre} — {sesion.rol}</span>
          <button className="btn btn-outline-secondary btn-sm" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-12 col-md-3 mb-4">
          <div className="list-group">
            <NavLink to="/admin" end className="list-group-item list-group-item-action">
              Resumen
            </NavLink>
            <NavLink to="/admin/productos" className="list-group-item list-group-item-action">
              Productos
            </NavLink>
            {sesion.rol === "Administrador" && (
              <NavLink to="/admin/usuarias" className="list-group-item list-group-item-action">
                Usuarias
              </NavLink>
            )}
            <NavLink to="/admin/pedidos" className="list-group-item list-group-item-action">
              Pedidos
            </NavLink>
          </div>
        </div>

        <div className="col-12 col-md-9">
          <Outlet />
        </div>
      </div>
    </div>
  );
}