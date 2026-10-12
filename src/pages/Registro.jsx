import { useState } from "react";
import { useNavigate, NavLink } from "react-router";
import { registrarUsuario } from "../data/usuarios";
import { esCorreoValido, esContrasenaValida, esLargoValido } from "../data/validaciones";

const REGIONES = [
  "Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo",
  "Valparaíso", "Metropolitana", "O'Higgins", "Maule", "Ñuble", "Biobío",
  "La Araucanía", "Los Ríos", "Los Lagos", "Aysén", "Magallanes",
];

export function Registro() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [telefono, setTelefono] = useState("");
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");

  const [mensaje, setMensaje] = useState("");
  const [esError, setEsError] = useState(false);

  function manejarEnvio(e) {
    e.preventDefault();

    if (!esLargoValido(nombre, 3, 100)) {
      setEsError(true);
      setMensaje("El nombre debe tener entre 3 y 100 caracteres.");
      return;
    }
    if (!esCorreoValido(correo)) {
      setEsError(true);
      setMensaje("Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com");
      return;
    }
    if (!esContrasenaValida(contrasena)) {
      setEsError(true);
      setMensaje("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }
    if (confirmar !== contrasena) {
      setEsError(true);
      setMensaje("Las contraseñas no coinciden.");
      return;
    }
    if (!region) {
      setEsError(true);
      setMensaje("Selecciona una región.");
      return;
    }
    if (!esLargoValido(comuna, 2, 100)) {
      setEsError(true);
      setMensaje("Ingresa una comuna válida.");
      return;
    }

    const resultado = registrarUsuario({
      nombre: nombre.trim(),
      correo: correo.trim(),
      contrasena,
      telefono: telefono.trim(),
      region,
      comuna: comuna.trim(),
    });

    if (resultado.ok) {
      setEsError(false);
      setMensaje("¡Cuenta creada! Ya puedes iniciar sesión.");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setEsError(true);
      setMensaje(resultado.mensaje);
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: "500px" }}>
      <h1 className="mb-4">Crear cuenta</h1>

      <form onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Confirmar contraseña</label>
          <input type="password" className="form-control" value={confirmar} onChange={(e) => setConfirmar(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono (opcional)</label>
          <input className="form-control" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Región</label>
          <select className="form-select" value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">Selecciona tu región</option>
            {REGIONES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Comuna</label>
          <input className="form-control" value={comuna} onChange={(e) => setComuna(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary w-100">Registrarme</button>

        {mensaje && (
          <p className={`mt-3 ${esError ? "text-danger" : "text-success"}`}>{mensaje}</p>
        )}
      </form>

      <p className="mt-3 text-center">
        ¿Ya tienes cuenta? <NavLink to="/login">Inicia sesión</NavLink>
      </p>
    </div>
  );
}