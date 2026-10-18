import { useState } from "react";
import { obtenerPedidos } from "../../data/pedidos";
import { formatoPrecio } from "../../data/productos";

export function AdminPedidos() {
  const [pedidos] = useState(() => obtenerPedidos());
  const pedidosOrdenados = [...pedidos].reverse();

  if (pedidosOrdenados.length === 0) {
    return (
      <div>
        <h2 className="h4 mb-3">Pedidos</h2>
        <p>Todavía no hay pedidos registrados.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="h4 mb-3">Pedidos</h2>

      {pedidosOrdenados.map((pedido) => (
        <div key={pedido.id} className="card mb-3">
          <div className="card-body">
            <div className="d-flex justify-content-between flex-wrap">
              <div>
                <p className="mb-1">
                  <strong>{pedido.clienteNombre}</strong> — {pedido.clienteCorreo}
                </p>
                <p className="text-muted mb-2">{pedido.fecha}</p>
              </div>
              <h3 className="h5">{formatoPrecio(pedido.total)}</h3>
            </div>

            <table className="table table-sm mb-0">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {pedido.items.map((item) => (
                  <tr key={item.codigo}>
                    <td>{item.nombre}</td>
                    <td>{item.cantidad}</td>
                    <td>{formatoPrecio(item.subtotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}