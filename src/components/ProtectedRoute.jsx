import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, rolRequerido }) {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // ❌ No hay sesión
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Rol incorrecto → cerrar sesión
  if (rolRequerido && usuario.rol !== rolRequerido) {
    localStorage.removeItem("usuario");
    return <Navigate to="/login" replace />;
  }

  // ✅ Acceso permitido
  return children;
}
