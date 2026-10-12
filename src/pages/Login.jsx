import { useState } from "react";
import { useNavigate } from "react-router";
import { esCorreoValido, esContrasenaValida } from "../data/validaciones";

export function Login({ iniciarSesionApp }) {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");

  function manejarEnvio(e) {
    e.preventDefault();

    if (!esCorreoValido(correo)) {
      setMensaje("Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com");
      return;
    }
    if (!esContrasenaValida(contrasena)) {
      setMensaje("La contraseña debe tener entre 4 y 10 caracteres.");
      return;
    }

    const resultado = iniciarSesionApp(correo.trim(), contrasena);

    if (resultado.ok) {
      navigate("/");
    } else {
      setMensaje(resultado.mensaje);
    }
  }

  return (
    <div className="container py-5" style={{ maxWidth: "400px" }}>
      <h1 className="mb-4">Iniciar sesión</h1>

      <form onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label className="form-label">Correo</label>
          <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary w-100">Entrar</button>

        {mensaje && <p className="mt-3 text-danger">{mensaje}</p>}
      </form>

      <p className="mt-3 text-center">Prueba con: panchita@gmail.com / admin123 (Administradora)</p>
    </div>
  );
}