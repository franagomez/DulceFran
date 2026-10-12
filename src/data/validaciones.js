// Validaciones reutilizables de DulceFran.

export function esCorreoValido(correo) {
  const patron = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
  return patron.test(correo.trim());
}

export function esContrasenaValida(contrasena) {
  return contrasena.length >= 4 && contrasena.length <= 10;
}

export function esLargoValido(texto, min, max) {
  const largo = texto.trim().length;
  return largo >= min && largo <= max;
}