// Usuarias y sesión de DulceFran, guardadas en localStorage.
// No hay backend real, todo vive en el navegador.

const CLAVE_USUARIOS = "dulcefran_usuarios";
const CLAVE_SESION = "dulcefran_sesion";

// Crea 2 cuentas de prueba (Administradora y Vendedora) la primera vez
// que se abre el sitio, para poder probar los distintos roles.
function sembrarUsuariosIniciales() {
  const guardado = localStorage.getItem(CLAVE_USUARIOS);
  if (!guardado) {
    localStorage.setItem(
      CLAVE_USUARIOS,
      JSON.stringify([
        {
          nombre: "Panchita (Administradora)",
          correo: "panchita@gmail.com",
          contrasena: "admin123",
          telefono: "",
          region: "Metropolitana",
          comuna: "Santiago",
          rol: "Administrador",
        },
        {
          nombre: "Repostera DulceFran",
          correo: "repostera@gmail.com",
          contrasena: "vende123",
          telefono: "",
          region: "Metropolitana",
          comuna: "Santiago",
          rol: "Vendedor",
        },
      ])
    );
  }
}

function guardarUsuarios(lista) {
  localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(lista));
}

export function obtenerUsuarios() {
  sembrarUsuariosIniciales();
  const guardado = localStorage.getItem(CLAVE_USUARIOS);
  return guardado ? JSON.parse(guardado) : [];
}

export function obtenerUsuarioPorCorreo(correo) {
  return obtenerUsuarios().find((u) => u.correo.toLowerCase() === correo.toLowerCase());
}

// Registra una nueva clienta. Devuelve { ok, mensaje }
export function registrarUsuario(datos) {
  const usuarios = obtenerUsuarios();
  const yaExiste = usuarios.some((u) => u.correo.toLowerCase() === datos.correo.toLowerCase());

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
    rol: "Cliente",
  });
  guardarUsuarios(usuarios);
  return { ok: true };
}

// Intenta iniciar sesión. Devuelve { ok, mensaje, sesion }
export function iniciarSesion(correo, contrasena) {
  const usuarios = obtenerUsuarios();
  const usuario = usuarios.find(
    (u) => u.correo.toLowerCase() === correo.toLowerCase() && u.contrasena === contrasena
  );

  if (!usuario) {
    return { ok: false, mensaje: "Correo o contraseña incorrectos." };
  }

  const sesion = { nombre: usuario.nombre, correo: usuario.correo, rol: usuario.rol };
  localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion));

  return { ok: true, sesion };
}

// --- Funciones usadas por el panel de Administrador ---

// Crea una usuaria desde el panel admin (puede tener cualquier rol)
export function agregarUsuarioAdmin(datos) {
  const usuarios = obtenerUsuarios();
  const yaExiste = usuarios.some((u) => u.correo.toLowerCase() === datos.correo.toLowerCase());
  if (yaExiste) {
    return { ok: false, mensaje: "Ya existe una cuenta registrada con ese correo." };
  }
  usuarios.push(datos);
  guardarUsuarios(usuarios);
  return { ok: true };
}

// Edita una usuaria existente (busca por correo original)
export function editarUsuarioAdmin(correoOriginal, datosNuevos) {
  const usuarios = obtenerUsuarios();
  const indice = usuarios.findIndex((u) => u.correo.toLowerCase() === correoOriginal.toLowerCase());
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

export function eliminarUsuario(correo) {
  let usuarios = obtenerUsuarios();
  usuarios = usuarios.filter((u) => u.correo.toLowerCase() !== correo.toLowerCase());
  guardarUsuarios(usuarios);
}

export function obtenerSesion() {
  const guardado = localStorage.getItem(CLAVE_SESION);
  return guardado ? JSON.parse(guardado) : null;
}

export function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}