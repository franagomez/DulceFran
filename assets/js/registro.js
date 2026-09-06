// ==========================================================
// Lógica de la página registro.html
// Validación en tiempo real + validación final al enviar el formulario
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {
    const nombre = document.getElementById("nombre");
    const correo = document.getElementById("correo");
    const contrasena = document.getElementById("contrasena");
    const confirmar = document.getElementById("confirmar");
    const telefono = document.getElementById("telefono");
    const region = document.getElementById("region");
    const comuna = document.getElementById("comuna");
    const form = document.getElementById("form-registro");
    const mensaje = document.getElementById("mensaje-registro");

    // --- Validación en tiempo real: se ejecuta mientras la usuaria escribe ---

    nombre.addEventListener("input", function (e) {
        if (!esLargoValido(e.target.value, 3, 100)) {
            mostrarError("nombre", "El nombre debe tener entre 3 y 100 caracteres.");
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

    contrasena.addEventListener("input", function (e) {
        if (!esContrasenaValida(e.target.value)) {
            mostrarError("contrasena", "La contraseña debe tener entre 4 y 10 caracteres.");
        } else {
            limpiarError("contrasena");
        }
    });

    confirmar.addEventListener("input", function (e) {
        if (e.target.value !== contrasena.value) {
            mostrarError("confirmar", "Las contraseñas no coinciden.");
        } else {
            limpiarError("confirmar");
        }
    });

    comuna.addEventListener("input", function (e) {
        if (!esLargoValido(e.target.value, 2, 100)) {
            mostrarError("comuna", "Ingresa una comuna válida.");
        } else {
            limpiarError("comuna");
        }
    });

    // --- Validación final al enviar el formulario ---

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let esValido = true;

        if (!esLargoValido(nombre.value, 3, 100)) {
            mostrarError("nombre", "El nombre debe tener entre 3 y 100 caracteres.");
            esValido = false;
        }
        if (!esCorreoValido(correo.value)) {
            mostrarError("correo", "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com");
            esValido = false;
        }
        if (!esContrasenaValida(contrasena.value)) {
            mostrarError("contrasena", "La contraseña debe tener entre 4 y 10 caracteres.");
            esValido = false;
        }
        if (confirmar.value !== contrasena.value) {
            mostrarError("confirmar", "Las contraseñas no coinciden.");
            esValido = false;
        }
        if (!region.value) {
            mostrarError("region", "Selecciona una región.");
            esValido = false;
        }
        if (!esLargoValido(comuna.value, 2, 100)) {
            mostrarError("comuna", "Ingresa una comuna válida.");
            esValido = false;
        }

        if (!esValido) {
            mensaje.textContent = "Revisa los campos marcados en rojo.";
            mensaje.classList.add("mensaje-error");
            return;
        }

        const resultado = registrarUsuario({
            nombre: nombre.value.trim(),
            correo: correo.value.trim(),
            contrasena: contrasena.value,
            telefono: telefono.value.trim(),
            region: region.value,
            comuna: comuna.value.trim()
        });

        if (resultado.ok) {
            mensaje.classList.remove("mensaje-error");
            mensaje.textContent = "¡Cuenta creada! Ya puedes iniciar sesión.";
            form.reset();
        } else {
            mensaje.classList.add("mensaje-error");
            mensaje.textContent = resultado.mensaje;
        }
    });
});
