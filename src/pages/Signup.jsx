import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signup } from "../services/api";
import { MdPerson, MdEmail, MdLock } from "react-icons/md";
import "./styles/Signup.css";

export default function Signup() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    setSuccess("");

    if (!nombre || !email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const res = await signup({
        nombre,
        email,
        password
      });

      if (res.message) {
        setSuccess("Usuario registrado correctamente");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      setError("Error al registrar usuario");
    }
  };

  return (
    <div id="signup-container">
      <div className="signup-card">

        <h1 className="signup-title">Raíz Oaxaca</h1>
        <p className="signup-subtitle">Crea tu cuenta</p>

        <div className="signup-form">

          {/* NOMBRE */}
          <div className="input-group">
            <MdPerson className="input-icon" />
            <input
              type="text"
              className="signup-input"
              placeholder="Nombre completo"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div className="input-group">
            <MdEmail className="input-icon" />
            <input
              type="email"
              className="signup-input"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <MdLock className="input-icon" />
            <input
              type="password"
              className="signup-input"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="signup-error">{error}</p>
          )}

          {success && (
            <p className="signup-success">{success}</p>
          )}

          <button
            className="signup-button"
            onClick={handleSignup}
          >
            Registrarse
          </button>

        </div>

        <p className="signup-footer">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="signup-link">
            Inicia sesión
          </Link>
        </p>

      </div>
    </div>
  );
}
