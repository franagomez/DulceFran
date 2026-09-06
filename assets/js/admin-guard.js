// ==========================================================
// Control de acceso del panel de administración.
// Cada página de admin/ llama a verificarAcceso([...roles permitidos])
// apenas carga. Si no hay sesión o el rol no está permitido, se
// redirige y se detiene la carga del resto del contenido.
// ==========================================================

function verificarAcceso(rolesPermitidos) {
    const sesion = obtenerSesion();

    if (!sesion) {
        alert("Debes iniciar sesión para acceder al panel de administración.");
        window.location.href = "../login.html";
        return null;
    }

    if (rolesPermitidos.indexOf(sesion.rol) === -1) {
        alert("Tu cuenta (" + sesion.rol + ") no tiene acceso a esta sección.");
        window.location.href = "../index.html";
        return null;
    }

    return sesion;
}
