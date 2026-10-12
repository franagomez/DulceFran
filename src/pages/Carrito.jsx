import { NavLink } from "react-router";
import { formatoPrecio } from "../data/productos";

export function Carrito({ carrito, productos, cambiarCantidad, eliminarDelCarrito }) {
  const items = carrito
    .map((item) => {
      const producto = productos.find((p) => p.codigo === item.codigo);
      return producto ? { ...item, producto } : null;
    })
    .filter((item) => item !== null);

  const total = items.reduce((suma, item) => suma + item.producto.precio * item.cantidad, 0);

  if (items.length === 0) {
    return (
      <div className="container py-5">
        <h1 className="mb-4">Tu carrito</h1>
        <p>
          Todavía no has agregado productos. <NavLink to="/productos">Ver catálogo</NavLink>
        </p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Tu carrito</h1>

      <table className="table align-middle">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.codigo}>
              <td>{item.producto.nombre}</td>
              <td>{formatoPrecio(item.producto.precio)}</td>
              <td style={{ maxWidth: "100px" }}>
                <input
                  type="number"
                  className="form-control"
                  min="1"
                  value={item.cantidad}
                  onChange={(e) => cambiarCantidad(item.codigo, Number(e.target.value))}
                />
              </td>
              <td>{formatoPrecio(item.producto.precio * item.cantidad)}</td>
              <td>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => eliminarDelCarrito(item.codigo)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="h4 text-end">Total: {formatoPrecio(total)}</h2>
    </div>
  );
}