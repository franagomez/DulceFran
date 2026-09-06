// ==========================================================
// Ajusta el menú de navegación según si hay una sesión activa.
// Este script se incluye en todas las páginas.
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {
    const sesion = obtenerSesion();
    const liLogin = document.getElementById("li-login");
    const liRegistro = document.getElementById("li-registro");

    if (!sesion || !liLogin || !liRegistro) {
        return;
    }

    liLogin.style.display = "none";
    liRegistro.style.display = "none";

    let enlacePanel = "";
    if (sesion.rol === "Administrador" || sesion.rol === "Vendedor") {
        enlacePanel = ' · <a href="admin/index.html">Panel admin</a>';
    }

    const liSesion = document.createElement("li");
    liSesion.innerHTML =
        'Hola, ' + sesion.nombre + ' (' + sesion.rol + ')' + enlacePanel + ' · ' +
        '<a href="#" id="link-cerrar-sesion">Cerrar sesión</a>';
    liRegistro.parentNode.insertBefore(liSesion, liRegistro.nextSibling);

    document.getElementById("link-cerrar-sesion").addEventListener("click", function (e) {
        e.preventDefault();
        cerrarSesion();
        window.location.href = "index.html";
    });
});
