// ==========================================================
// DulceFran - Manejo de usuarias y sesión (todo en localStorage,
// no hay backend ni base de datos real).
// ==========================================================

const CLAVE_USUARIOS = "dulcefran_usuarios";
const CLAVE_SESION = "dulcefran_sesion";

function obtenerUsuarios() {
    const guardado = localStorage.getItem(CLAVE_USUARIOS);
    return guardado ? JSON.parse(guardado) : [];
}

function guardarUsuarios(lista) {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista));
}

// Crea 2 cuentas de prueba (Administrador y Vendedor) la primera vez
// que se abre el sitio, para poder probar los distintos roles.
function sembrarUsuariosIniciales() {
    const usuarios = obtenerUsuarios();
    if (usuarios.length === 0) {
        guardarUsuarios([
            {
                nombre: "Panchita (Administradora)",
                correo: "panchita@gmail.com",
                contrasena: "admin123",
                telefono: "",
                region: "Metropolitana",
                comuna: "Santiago",
                rol: "Administrador"
            },
            {
                nombre: "Repostera DulceFran",
                correo: "repostera@gmail.com",
                contrasena: "vende123",
                telefono: "",
                region: "Metropolitana",
                comuna: "Santiago",
                rol: "Vendedor"
            }
        ]);
    }
}

// Registra una nueva clienta. Devuelve { ok, mensaje }
function registrarUsuario(datos) {
    const usuarios = obtenerUsuarios();
    const yaExiste = usuarios.some(function (u) {
        return u.correo.toLowerCase() === datos.correo.toLowerCase();
    });

    if (yaExiste) {
        return { ok: false, mensaje: "Ya existe una cuenta registrada con ese correo." };
    }

    usuarios.push({
        nombre: datos.nombre,
        correo: datos.correo,
        contrasena: datos.contrasena,
        telefono: datos.telefono || "",
        region: datos.region,
        comuna: datos.comuna,
        rol: "Cliente"
    });
    guardarUsuarios(usuarios);
    return { ok: true };
}

// Intenta iniciar sesión. Devuelve { ok, mensaje, usuario }
function iniciarSesion(correo, contrasena) {
    const usuarios = obtenerUsuarios();
    const usuario = usuarios.find(function (u) {
        return u.correo.toLowerCase() === correo.toLowerCase() && u.contrasena === contrasena;
    });

    if (!usuario) {
        return { ok: false, mensaje: "Correo o contraseña incorrectos." };
    }

    localStorage.setItem(CLAVE_SESION, JSON.stringify({
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
    }));

    return { ok: true, usuario: usuario };
}

// --- Funciones usadas por el panel de Administrador (admin/usuarias.html) ---

function obtenerUsuarioPorCorreo(correo) {
    return obtenerUsuarios().find(function (u) {
        return u.correo.toLowerCase() === correo.toLowerCase();
    });
}

// Crea una usuaria desde el panel admin (puede tener cualquier rol)
function agregarUsuarioAdmin(datos) {
    const usuarios = obtenerUsuarios();
    const yaExiste = usuarios.some(function (u) {
        return u.correo.toLowerCase() === datos.correo.toLowerCase();
    });
    if (yaExiste) {
        return { ok: false, mensaje: "Ya existe una cuenta registrada con ese correo." };
    }
    usuarios.push(datos);
    guardarUsuarios(usuarios);
    return { ok: true };
}

// Edita una usuaria existente (busca por correo original)
function editarUsuarioAdmin(correoOriginal, datosNuevos) {
    const usuarios = obtenerUsuarios();
    const indice = usuarios.findIndex(function (u) {
        return u.correo.toLowerCase() === correoOriginal.toLowerCase();
    });
    if (indice === -1) {
        return { ok: false, mensaje: "No se encontró la usuaria a editar." };
    }
    // Si no se ingresó una contraseña nueva, se mantiene la anterior.
    if (!datosNuevos.contrasena) {
        datosNuevos.contrasena = usuarios[indice].contrasena;
    }
    usuarios[indice] = datosNuevos;
    guardarUsuarios(usuarios);
    return { ok: true };
}

function eliminarUsuario(correo) {
    let usuarios = obtenerUsuarios();
    usuarios = usuarios.filter(function (u) {
        return u.correo.toLowerCase() !== correo.toLowerCase();
    });
    guardarUsuarios(usuarios);
}

function obtenerSesion() {
    const guardado = localStorage.getItem(CLAVE_SESION);
    return guardado ? JSON.parse(guardado) : null;
}

function cerrarSesion() {
    localStorage.removeItem(CLAVE_SESION);
}

document.addEventListener("DOMContentLoaded", sembrarUsuariosIniciales);
