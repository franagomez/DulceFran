// ==========================================================
// DulceFran - Funciones de validación reutilizables
// (siguiendo el patrón addEventListener + e.target.value visto en clase)
// ==========================================================

// Correo: solo se aceptan estos 3 dominios, según el Anexo 1
function esCorreoValido(correo) {
    const patron = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
    return patron.test(correo.trim());
}

// Contraseña: entre 4 y 10 caracteres
function esContrasenaValida(contrasena) {
    return contrasena.length >= 4 && contrasena.length <= 10;
}

// Texto genérico con largo mínimo y máximo (nombre, apellidos, dirección, etc.)
function esLargoValido(texto, min, max) {
    const largo = texto.trim().length;
    return largo >= min && largo <= max;
}

// Muestra un mensaje de error bajo un campo. Cada input debe tener
// un <span id="ID-error"></span> justo después en el HTML.
function mostrarError(idCampo, mensaje) {
    const span = document.getElementById(idCampo + "-error");
    if (span) {
        span.textContent = mensaje;
    }
}

function limpiarError(idCampo) {
    mostrarError(idCampo, "");
}

// RUN chileno sin puntos ni guión: entre 7 y 9 caracteres,
// solo dígitos y, opcionalmente, un dígito verificador K/k al final.
function esRunValido(run) {
    const limpio = run.trim();
    if (limpio.length < 7 || limpio.length > 9) {
        return false;
    }
    return /^[0-9]+[0-9kK]$/.test(limpio);
}
