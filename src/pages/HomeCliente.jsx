import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/api";
import { MdLogout } from "react-icons/md";
import { FaStore } from "react-icons/fa";
import "./styles/HomeCliente.css";

export default function HomeCliente() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await obtenerProductos();
      setProductos(res);
    } catch (err) {
      setError("Error al cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  };

  if (loading) {
    return <p className="catalog-loading">Cargando catálogo...</p>;
  }

  if (error) {
    return <p className="catalog-error">{error}</p>;
  }

  return (
    <div id="cliente-container">
      {/* NAVBAR */}
      <nav className="admin-navbar">
        <div className="nav-left">
          <FaStore />
          <span>Raíz Oaxaca</span>
        </div>

        <div className="nav-center">
          Panel de Administración
        </div>

        <div className="nav-right">
          <button className="logout-btn" onClick={handleLogout}>
            <MdLogout />
            <span className="logout-text">Cerrar sesión</span>
          </button>
        </div>
      </nav>
      <header className="catalog-header">
        <h1 className="catalog-title">Catálogo Raíz Oaxaca</h1>
        <p className="catalog-subtitle">
          Artesanías auténticas hechas con tradición
        </p>
      </header>

      {productos.length === 0 ? (
        <p className="catalog-empty">
          No hay productos disponibles por el momento
        </p>
      ) : (
        <div className="catalog-grid">
          {productos.map((p) => (
            <div className="product-card" key={p.id_producto}>

              <div className="product-image-container">
                <img
                  src={p.imagen_url}
                  alt={p.nombre}
                  className="product-image"
                />
              </div>

              <div className="product-info">
                <h3 className="product-name">{p.nombre}</h3>

                <p className="product-description">
                  {p.descripcion}
                </p>

                <div className="product-meta">
                  <span className="product-price">
                    ${p.precio.toFixed(2)}
                  </span>

                  <span className={`product-stock ${p.stock > 0 ? "in-stock" : "out-stock"}`}>
                    {p.stock > 0 ? `Stock: ${p.stock}` : "Agotado"}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
