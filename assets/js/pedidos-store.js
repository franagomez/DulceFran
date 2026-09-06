// ==========================================================
// DulceFran - Historial de pedidos (localStorage)
// Se guarda un registro cada vez que alguien confirma su carrito.
// El Administrador y el Vendedor pueden ver este listado (Anexo 1, R.13).
// ==========================================================

const CLAVE_PEDIDOS = "dulcefran_pedidos";

function obtenerPedidos() {
    const guardado = localStorage.getItem(CLAVE_PEDIDOS);
    return guardado ? JSON.parse(guardado) : [];
}

function guardarPedidos(lista) {
    localStorage.setItem(CLAVE_PEDIDOS, JSON.stringify(lista));
}

// items: [{ codigo, nombre, cantidad, precioUnitario, subtotal }]
function registrarPedido(items, total) {
    const sesion = typeof obtenerSesion === "function" ? obtenerSesion() : null;
    const pedidos = obtenerPedidos();

    pedidos.push({
        id: Date.now(),
        fecha: new Date().toLocaleString("es-CL"),
        clienteNombre: sesion ? sesion.nombre : "Invitada (sin sesión)",
        clienteCorreo: sesion ? sesion.correo : "-",
        items: items,
        total: total
    });

    guardarPedidos(pedidos);
}
