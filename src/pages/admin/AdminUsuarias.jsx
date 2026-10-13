import { useState } from "react";
import {
  obtenerUsuarios,
  agregarUsuarioAdmin,
  editarUsuarioAdmin,
  eliminarUsuario,
} from "../../data/usuarios";
import { esCorreoValido, esContrasenaValida } from "../../data/validaciones";

const ROLES = ["Administrador", "Vendedor"];
const USUARIO_VACIO = { nombre: "", correo: "", contrasena: "", rol: "Vendedor" };

export function AdminUsuarias({ sesion }) {
  const [usuarios, setUsuarios] = useState(() => obtenerUsuarios());
  const [correoOriginal, setCorreoOriginal] = useState("");
  const [form, setForm] = useState(USUARIO_VACIO);
  const [mensaje, setMensaje] = useState("");
  const [esError, setEsError] = useState(false);

  if (sesion.rol !== "Administrador") {
    return (
      <div className="container py-5">
        <p className="text-danger">No tienes permiso para ver esta sección.</p>
      </div>
    );
  }

  function actualizarCampo(campo, valor) {
    setForm((actual) => ({ ...actual, [campo]: valor }));
  }

  function cargarEnFormulario(usuario) {
    setCorreoOriginal(usuario.correo);
    setForm({
      nombre: usuario.nombre,
      correo: usuario.correo,
      contrasena: usuario.contrasena,
      rol: usuario.rol,
    });
    setMensaje("");
  }

  function limpiarFormulario() {
    setCorreoOriginal("");
    setForm(USUARIO_VACIO);
    setMensaje("");
  }

  function manejarEliminar(correo) {
    if (window.confirm("¿Eliminar esta usuaria?")) {
      eliminarUsuario(correo);
      setUsuarios(obtenerUsuarios());
      if (correoOriginal === correo) {
        limpiarFormulario();
      }
    }
  }

  function manejarEnvio(e) {
    e.preventDefault();

    if (!esCorreoValido(form.correo)) {
      setEsError(true);
      setMensaje("El correo no es válido (debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com).");
      return;
    }
    if (!esContrasenaValida(form.contrasena)) {
      setEsError(true);
      setMensaje("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }

    let resultado;
    if (correoOriginal) {
      resultado = editarUsuarioAdmin(correoOriginal, form);
    } else {
      resultado = agregarUsuarioAdmin(form);
    }

    if (!resultado.ok) {
      setEsError(true);
      setMensaje(resultado.mensaje);
      return;
    }

    setUsuarios(obtenerUsuarios());
    setEsError(false);
    setMensaje(correoOriginal ? "Usuaria editada." : "Usuaria agregada.");
    limpiarFormulario();
  }

  return (
    <div>
      <h2 className="h4 mb-3">Usuarias</h2>

      <table className="table table-sm align-middle">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.correo}>
              <td>{u.nombre}</td>
              <td>{u.correo}</td>
              <td>{u.rol}</td>
              <td className="text-end">
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => cargarEnFormulario(u)}>
                  Editar
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => manejarEliminar(u.correo)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="h5 mt-4">{correoOriginal ? "Editar usuaria" : "Agregar usuaria"}</h3>

      {mensaje && <p className={esError ? "text-danger" : "text-success"}>{mensaje}</p>}

      <form onSubmit={manejarEnvio} className="row g-3">
        <div className="col-12 col-md-6">
          <label className="form-label">Nombre</label>
          <input
            className="form-control"
            value={form.nombre}
            onChange={(e) => actualizarCampo("nombre", e.target.value)}
            required
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label">Correo</label>
          <input
            className="form-control"
            value={form.correo}
            onChange={(e) => actualizarCampo("correo", e.target.value)}
            required
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label">Contraseña</label>
          <input
            className="form-control"
            value={form.contrasena}
            onChange={(e) => actualizarCampo("contrasena", e.target.value)}
            required
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label">Rol</label>
          <select className="form-select" value={form.rol} onChange={(e) => actualizarCampo("rol", e.target.value)}>
            {ROLES.map((rol) => (
              <option key={rol} value={rol}>
                {rol}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary me-2">
            {correoOriginal ? "Guardar cambios" : "Agregar usuaria"}
          </button>
          {correoOriginal && (
            <button type="button" className="btn btn-secondary" onClick={limpiarFormulario}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}