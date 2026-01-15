import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/api";
import "./styles/Login.css";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await login({ email, password });

      if (res.usuario) {
        localStorage.setItem("usuario", JSON.stringify(res.usuario));

        if (res.usuario.rol === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/cliente");
        }
      } else {
        setError("Correo o contraseña incorrectos");
      }
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div id="login-container">
      <div className="login-card">

        <h1 className="login-title">Raíz Oaxaca</h1>
        <p className="login-subtitle">
          Accede a tu cuenta
        </p>

        <div className="login-form">

          <div className="input-group">
            <input
              type="email"
              className="login-input"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              className="login-input"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button
            className="login-button"
            onClick={handleLogin}
          >
            Iniciar sesión
          </button>

        </div>

        <p className="login-footer">
          ¿No tienes cuenta?{" "}
          <Link to="/signup" className="login-link">
            Regístrate
          </Link>
        </p>

      </div>
    </div>
  );
}
