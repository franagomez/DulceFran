// ==========================================================
// Lógica de la página contacto.html
// Este proyecto no tiene backend, así que el mensaje no se envía
// a ninguna parte de verdad: solo se valida y se confirma en pantalla.
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const comentario = document.getElementById("comentario");
    const form = document.getElementById("form-contacto");
    const mensaje = document.getElementById("mensaje-contacto");

    nombre.addEventListener("input", function (e) {
        if (!esLargoValido(e.target.value, 2, 100)) {
            mostrarError("nombre", "El nombre debe tener entre 2 y 100 caracteres.");
        } else {
            limpiarError("nombre");
        }
    });

    correo.addEventListener("input", function (e) {
        if (!esCorreoValido(e.target.value)) {
            mostrarError("correo", "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com");
        } else {
            limpiarError("correo");
        }
    });

    comentario.addEventListener("input", function (e) {
        if (!esLargoValido(e.target.value, 1, 500)) {
            mostrarError("comentario", "El comentario es obligatorio (máximo 500 caracteres).");
        } else {
            limpiarError("comentario");
        }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let esValido = true;

        if (!esLargoValido(nombre.value, 2, 100)) {
            mostrarError("nombre", "El nombre debe tener entre 2 y 100 caracteres.");
            esValido = false;
        }
        if (!esCorreoValido(correo.value)) {
            mostrarError("correo", "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com");
            esValido = false;
        }
        if (!esLargoValido(comentario.value, 1, 500)) {
            mostrarError("comentario", "El comentario es obligatorio (máximo 500 caracteres).");
            esValido = false;
        }

        if (!esValido) {
            mensaje.classList.add("mensaje-error");
            mensaje.textContent = "Revisa los campos marcados en rojo.";
            return;
        }

        mensaje.classList.remove("mensaje-error");
        mensaje.textContent = "¡Gracias por escribirnos! Te responderemos apenas podamos.";
        form.reset();
    });
});
