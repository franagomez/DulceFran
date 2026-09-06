// ==========================================================
// Lógica de admin/pedidos.html
// Visible en modo solo lectura para Administrador y Vendedor (Anexo 1, R.13).
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {
    const sesion = verificarAcceso(["Administrador", "Vendedor"]);
    if (!sesion) { return; }

    if (sesion.rol !== "Administrador") {
        document.getElementById("li-usuarias").style.display = "none";
    }

    document.getElementById("link-cerrar-sesion").addEventListener("click", function (e) {
        e.preventDefault();
        cerrarSesion();
        window.location.href = "../index.html";
    });

    const pedidos = obtenerPedidos();
    const cuerpo = document.getElementById("cuerpo-tabla-pedidos");

    if (pedidos.length === 0) {
        cuerpo.innerHTML = '<tr><td colspan="5">Todavía no hay pedidos registrados.</td></tr>';
        return;
    }

    cuerpo.innerHTML = pedidos.slice().reverse().map(function (pedido) {
        const listaProductos = pedido.items.map(function (i) {
            return i.cantidad + "x " + i.nombre;
        }).join(", ");

        return '<tr>' +
            '<td>' + pedido.fecha + '</td>' +
            '<td>' + pedido.clienteNombre + '</td>' +
            '<td>' + pedido.clienteCorreo + '</td>' +
            '<td>' + listaProductos + '</td>' +
            '<td>$' + pedido.total.toLocaleString('es-CL') + '</td>' +
            '</tr>';
    }).join('');
});
