import { useState } from "react";
import { useParams, NavLink } from "react-router";
import { formatoPrecio } from "../data/productos";

export function ProductoDetalle({ productos, agregarAlCarrito }) {
  const { codigo } = useParams();
  const producto = productos.find((p) => p.codigo === codigo);

  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState("");

  if (!producto) {
    return (
      <div className="container py-5">
        <p>
          No encontramos ese producto. <NavLink to="/productos">Volver al catálogo</NavLink>
        </p>
      </div>
    );
  }

  function manejarAgregar() {
    if (isNaN(cantidad) || cantidad < 1) {
      setMensaje("Ingresa una cantidad válida (mínimo 1).");
      return;
    }
    agregarAlCarrito(producto.codigo, cantidad);
    setMensaje(`¡Agregado! ${cantidad} x ${producto.nombre} en tu carrito.`);
  }

  return (
    <div className="container py-5">
      <p className="text-muted">{producto.categoria}</p>
      <h1>{producto.nombre}</h1>
      <p className="fs-3 fw-bold">{formatoPrecio(producto.precio)}</p>
      <p>{producto.descripcion}</p>

      <div className="mb-3" style={{ maxWidth: "150px" }}>
        <label htmlFor="cantidad" className="form-label">Cantidad:</label>
        <input
          type="number"
          id="cantidad"
          className="form-control"
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
        />
      </div>

      <button className="btn btn-primary" onClick={manejarAgregar}>
        Agregar al carrito
      </button>

      {mensaje && <p className="mt-3 text-success">{mensaje}</p>}
    </div>
  );
}