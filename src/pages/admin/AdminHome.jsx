import { obtenerUsuarios } from "../../data/usuarios";
import { obtenerPedidos } from "../../data/pedidos";

export function AdminHome({ sesion, productos }) {
  const enAlerta = productos.filter((p) => p.stock <= p.stockCritico);
  const pedidos = obtenerPedidos();
  const usuarias = sesion.rol === "Administrador" ? obtenerUsuarios() : [];

  return (
    <div>
      <h2 className="h4 mb-4">Resumen</h2>
      <div className="row g-3">
        <div className="col-6 col-lg-3">
          <div className="card text-center p-3">
            <span className="fs-3 fw-bold">{productos.length}</span>
            <span className="text-muted small">Productos en catálogo</span>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="card text-center p-3">
            <span className="fs-3 fw-bold">{enAlerta.length}</span>
            <span className="text-muted small">Con stock crítico</span>
          </div>
        </div>
        <div className="col-6 col-lg-3">
          <div className="card text-center p-3">
            <span className="fs-3 fw-bold">{pedidos.length}</span>
            <span className="text-muted small">Pedidos registrados</span>
          </div>
        </div>
        {sesion.rol === "Administrador" && (
          <div className="col-6 col-lg-3">
            <div className="card text-center p-3">
              <span className="fs-3 fw-bold">{usuarias.length}</span>
              <span className="text-muted small">Usuarias registradas</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}