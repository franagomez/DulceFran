import { Navigate } from "react-router";

export function RutaProtegida({ sesion, rolesPermitidos, children }) {
  if (!sesion) {
    return <Navigate to="/login" replace />;
  }
  if (!rolesPermitidos.includes(sesion.rol)) {
    return <Navigate to="/" replace />;
  }
  return children;
}