// ==========================================================
// Lógica de admin/index.html
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {
    const sesion = verificarAcceso(["Administrador", "Vendedor"]);
    if (!sesion) { return; }

    document.getElementById("saludo").textContent =
        "Hola, " + sesion.nombre + " — has entrado como " + sesion.rol + ".";

    // El CRUD de usuarias es exclusivo del Administrador (Anexo 1)
    if (sesion.rol !== "Administrador") {
        document.getElementById("li-usuarias").style.display = "none";
    }

    document.getElementById("link-cerrar-sesion").addEventListener("click", function (e) {
        e.preventDefault();
        cerrarSesion();
        window.location.href = "../index.html";
    });

    const productos = obtenerProductos();
    const enAlerta = productos.filter(function (p) { return p.stock <= p.stockCritico; });
    const usuarias = typeof obtenerUsuarios === "function" ? obtenerUsuarios() : [];
    const pedidos = typeof obtenerPedidos === "function" ? obtenerPedidos() : [];

    let html =
        '<article class="producto"><h4>Productos en el catálogo</h4><span class="Precio">' + productos.length + '</span></article>' +
        '<article class="producto"><h4>Productos con stock crítico</h4><span class="Precio">' + enAlerta.length + '</span></article>' +
        '<article class="producto"><h4>Pedidos registrados</h4><span class="Precio">' + pedidos.length + '</span></article>';

    if (sesion.rol === "Administrador") {
        html += '<article class="producto"><h4>Usuarias registradas</h4><span class="Precio">' + usuarias.length + '</span></article>';
    }

    document.getElementById("resumen").innerHTML = html;
});
