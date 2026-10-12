import { useState } from "react";
import { esLargoValido, esCorreoValido } from "../data/validaciones";

export function Contacto() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [esError, setEsError] = useState(false);

  function manejarEnvio(e) {
    e.preventDefault();

    if (!esLargoValido(nombre, 2, 100)) {
      setEsError(true);
      setMensaje("El nombre debe tener entre 2 y 100 caracteres.");
      return;
    }
    if (!esCorreoValido(correo)) {
      setEsError(true);
      setMensaje("Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com");
      return;
    }
    if (!esLargoValido(comentario, 1, 500)) {
      setEsError(true);
      setMensaje("El comentario es obligatorio (máximo 500 caracteres).");
      return;
    }

    setEsError(false);
    setMensaje("¡Gracias por escribirnos! Te responderemos apenas podamos.");
    setNombre("");
    setCorreo("");
    setComentario("");
  }

  return (
    <div className="container py-5" style={{ maxWidth: "500px" }}>
      <h1 className="mb-3">Contáctanos</h1>
      <p className="mb-4">
        ¿Tienes dudas sobre un pedido, un evento o quieres cotizar algo especial?
        Escríbenos y te responderemos a la brevedad.
      </p>

      <form onSubmit={manejarEnvio}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input type="email" className="form-control" value={correo} onChange={(e) => setCorreo(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Comentario</label>
          <textarea className="form-control" rows="5" value={comentario} onChange={(e) => setComentario(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary w-100">Enviar mensaje</button>

        {mensaje && <p className={`mt-3 ${esError ? "text-danger" : "text-success"}`}>{mensaje}</p>}
      </form>
    </div>
  );
}