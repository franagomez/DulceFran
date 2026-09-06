// ==========================================================
// Lógica de admin/usuarias.html
// Página exclusiva del rol Administrador (Anexo 1, R.12).
// ==========================================================

function renderizarTablaUsuarias() {
    const usuarios = obtenerUsuarios();
    const cuerpo = document.getElementById("cuerpo-tabla-usuarias");

    cuerpo.innerHTML = usuarios.map(function (u) {
        return '<tr>' +
            '<td>' + (u.run || '-') + '</td>' +
            '<td>' + u.nombre + (u.apellidos ? ' ' + u.apellidos : '') + '</td>' +
            '<td>' + u.correo + '</td>' +
            '<td>' + u.rol + '</td>' +
            '<td>' + (u.region || '-') + ' / ' + (u.comuna || '-') + '</td>' +
            '<td>' +
            '<button class="boton boton-chico btn-editar-usuaria" data-correo="' + u.correo + '">Editar</button> ' +
            '<button class="boton boton-chico boton-eliminar btn-eliminar-usuaria" data-correo="' + u.correo + '">Eliminar</button>' +
            '</td>' +
            '</tr>';
    }).join('');

    document.querySelectorAll(".btn-editar-usuaria").forEach(function (btn) {
        btn.addEventListener("click", function () { cargarUsuariaEnFormulario(btn.dataset.correo); });
    });
    document.querySelectorAll(".btn-eliminar-usuaria").forEach(function (btn) {
        btn.addEventListener("click", function () {
            if (confirm("¿Eliminar esta cuenta?")) {
                eliminarUsuario(btn.dataset.correo);
                renderizarTablaUsuarias();
            }
        });
    });
}

function cargarUsuariaEnFormulario(correo) {
    const u = obtenerUsuarioPorCorreo(correo);
    if (!u) { return; }

    document.getElementById("titulo-formulario-usuaria").textContent = "Editar usuaria";
    document.getElementById("correo-original").value = u.correo;
    document.getElementById("run").value = u.run || "";
    document.getElementById("nombre").value = u.nombre || "";
    document.getElementById("apellidos").value = u.apellidos || "";
    document.getElementById("correo").value = u.correo;
    document.getElementById("contrasena").value = "";
    document.getElementById("fechaNacimiento").value = u.fechaNacimiento || "";
    document.getElementById("rol").value = u.rol || "";
    document.getElementById("region").value = u.region || "";
    document.getElementById("comuna").value = u.comuna || "";
    document.getElementById("direccion").value = u.direccion || "";
    document.getElementById("btn-cancelar-edicion-usuaria").hidden = false;
    window.scrollTo({ top: document.getElementById("form-usuaria").offsetTop, behavior: "smooth" });
}

function limpiarFormularioUsuaria() {
    document.getElementById("titulo-formulario-usuaria").textContent = "Agregar usuaria";
    document.getElementById("form-usuaria").reset();
    document.getElementById("correo-original").value = "";
    document.getElementById("btn-cancelar-edicion-usuaria").hidden = true;
}

document.addEventListener("DOMContentLoaded", function () {
    const sesion = verificarAcceso(["Administrador"]);
    if (!sesion) { return; }

    document.getElementById("link-cerrar-sesion").addEventListener("click", function (e) {
        e.preventDefault();
        cerrarSesion();
        window.location.href = "../index.html";
    });

    renderizarTablaUsuarias();

    const form = document.getElementById("form-usuaria");
    const mensaje = document.getElementById("mensaje-usuaria");

    document.getElementById("btn-cancelar-edicion-usuaria").addEventListener("click", limpiarFormularioUsuaria);

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const correoOriginal = document.getElementById("correo-original").value;
        const run = document.getElementById("run").value.trim();
        const nombre = document.getElementById("nombre").value.trim();
        const apellidos = document.getElementById("apellidos").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const contrasena = document.getElementById("contrasena").value;
        const fechaNacimiento = document.getElementById("fechaNacimiento").value;
        const rol = document.getElementById("rol").value;
        const region = document.getElementById("region").value.trim();
        const comuna = document.getElementById("comuna").value.trim();
        const direccion = document.getElementById("direccion").value.trim();

        let esValido = true;

        if (!esRunValido(run)) {
            mostrarError("run", "El RUN debe tener entre 7 y 9 caracteres, sin puntos ni guión.");
            esValido = false;
        } else { limpiarError("run"); }

        if (!esLargoValido(nombre, 2, 50)) {
            mostrarError("nombre", "El nombre debe tener entre 2 y 50 caracteres.");
            esValido = false;
        } else { limpiarError("nombre"); }

        if (!esLargoValido(apellidos, 2, 100)) {
            mostrarError("apellidos", "Los apellidos deben tener entre 2 y 100 caracteres.");
            esValido = false;
        } else { limpiarError("apellidos"); }

        if (!esCorreoValido(correo)) {
            mostrarError("correo", "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com");
            esValido = false;
        } else { limpiarError("correo"); }

        // La contraseña solo es obligatoria al crear una cuenta nueva
        if (!correoOriginal && !esContrasenaValida(contrasena)) {
            mostrarError("contrasena", "La contraseña debe tener entre 4 y 10 caracteres.");
            esValido = false;
        } else if (contrasena && !esContrasenaValida(contrasena)) {
            mostrarError("contrasena", "La contraseña debe tener entre 4 y 10 caracteres.");
            esValido = false;
        } else {
            limpiarError("contrasena");
        }

        if (!fechaNacimiento) {
            mostrarError("fechaNacimiento", "Selecciona una fecha de nacimiento.");
            esValido = false;
        } else { limpiarError("fechaNacimiento"); }

        if (!rol) {
            mostrarError("rol", "Selecciona un tipo de usuaria.");
            esValido = false;
        } else { limpiarError("rol"); }

        if (!esLargoValido(region, 2, 50)) {
            mostrarError("region", "Ingresa una región válida.");
            esValido = false;
        } else { limpiarError("region"); }

        if (!esLargoValido(comuna, 2, 100)) {
            mostrarError("comuna", "Ingresa una comuna válida.");
            esValido = false;
        } else { limpiarError("comuna"); }

        if (!esLargoValido(direccion, 5, 300)) {
            mostrarError("direccion", "La dirección debe tener entre 5 y 300 caracteres.");
            esValido = false;
        } else { limpiarError("direccion"); }

        if (!esValido) {
            mensaje.classList.add("mensaje-error");
            mensaje.textContent = "Revisa los campos marcados en rojo.";
            return;
        }

        const datosUsuaria = {
            run: run, nombre: nombre, apellidos: apellidos, correo: correo,
            contrasena: contrasena, fechaNacimiento: fechaNacimiento, rol: rol,
            region: region, comuna: comuna, direccion: direccion
        };

        let resultado;
        if (correoOriginal) {
            resultado = editarUsuarioAdmin(correoOriginal, datosUsuaria);
        } else {
            resultado = agregarUsuarioAdmin(datosUsuaria);
        }

        if (resultado.ok) {
            mensaje.classList.remove("mensaje-error");
            mensaje.textContent = correoOriginal ? "Usuaria actualizada." : "Usuaria creada.";
            limpiarFormularioUsuaria();
            renderizarTablaUsuarias();
        } else {
            mensaje.classList.add("mensaje-error");
            mensaje.textContent = resultado.mensaje;
        }
    });
});
