const CLAVE_PEDIDOS = "dulcefran_pedidos";

export function obtenerPedidos() {
  const guardado = localStorage.getItem(CLAVE_PEDIDOS);
  return guardado ? JSON.parse(guardado) : [];
}

function guardarPedidos(lista) {
  localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(lista));
}

// items: [{ codigo, nombre, cantidad, precioUnitario, subtotal }]
export function registrarPedido(sesion, items, total) {
  const pedidos = obtenerPedidos();

  pedidos.push({
    id: Date.now(),
    fecha: new Date().toLocaleString("es-CL"),
    clienteNombre: sesion ? sesion.nombre : "Invitada (sin sesión)",
    clienteCorreo: sesion ? sesion.correo : "-",
    items,
    total,
  });

  guardarPedidos(pedidos);
}