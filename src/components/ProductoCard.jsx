import { NavLink } from "react-router";
import { formatoPrecio } from "../data/productos";

export function ProductoCard({ producto }) {
  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body d-flex flex-column">
        <h3 className="h5">{producto.nombre}</h3>
        <p className="fw-bold mb-1">{formatoPrecio(producto.precio)}</p>
        <p className="text-muted small flex-grow-1">{producto.descripcion}</p>
        <NavLink to={`/productos/${producto.codigo}`} className="btn btn-outline-primary btn-sm mt-2">
          Ver detalle
        </NavLink>
      </div>
    </article>
  );
}