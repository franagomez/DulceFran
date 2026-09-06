// ==========================================================
// Lógica de la página login.html
// ==========================================================

document.addEventListener("DOMContentLoaded", function () {
    const correo = document.getElementById("correo");
    const contrasena = document.getElementById("contrasena");
    const form = document.getElementById("form-login");
    const mensaje = document.getElementById("mensaje-login");

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

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        let esValido = true;

        if (!esCorreoValido(correo.value)) {
            mostrarError("correo", "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com");
            esValido = false;
        }
        if (!esContrasenaValida(contrasena.value)) {
            mostrarError("contrasena", "La contraseña debe tener entre 4 y 10 caracteres.");
            esValido = false;
        }
        if (!esValido) {
            return;
        }

        const resultado = iniciarSesion(correo.value.trim(), contrasena.value);

        if (resultado.ok) {
            window.location.href = "index.html";
        } else {
            mensaje.classList.add("mensaje-error");
            mensaje.textContent = resultado.mensaje;
        }
    });
});
