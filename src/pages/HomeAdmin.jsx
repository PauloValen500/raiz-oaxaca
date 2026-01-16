import { useEffect, useState } from "react";
import {
  obtenerProductos,
  crearProducto,
  editarProducto,
  eliminarProducto
} from "../services/api";
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdLogout,
  MdInventory,
  MdAttachMoney
} from "react-icons/md";
import { FaStore } from "react-icons/fa";
import "./styles/HomeAdmin.css";

export default function HomeAdmin() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);

  const [form, setForm] = useState({
    id_producto: null,
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: ""
  });

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const res = await obtenerProductos();
      setProductos(res);
    } catch (err) {
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  const abrirCrear = () => {
    limpiarFormulario();
    setMostrarModal(true);
  };

  const abrirEditar = (producto) => {
    if (!producto?.id_producto) {
      alert("Producto inválido para editar");
      return;
    }

    setForm({
      id_producto: Number(producto.id_producto),
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      imagen: ""
    });

    setModoEditar(true);
    setMostrarModal(true);
  };

  const limpiarFormulario = () => {
    setForm({
      id_producto: null,
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      imagen: ""
    });
    setModoEditar(false);
  };

  const convertirImagenBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.descripcion || !form.precio || !form.stock) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const data = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: Number(form.precio),
        stock: Number(form.stock),
        imagen: form.imagen
      };

      if (modoEditar) {
        if (!form.id_producto || isNaN(form.id_producto)) {
          alert("ID del producto no válido");
          return;
        }
        await editarProducto(Number(form.id_producto), data);
      } else {
        if (!form.imagen) {
          alert("Selecciona una imagen");
          return;
        }
        await crearProducto(data);
      }

      setMostrarModal(false);
      limpiarFormulario();
      cargarProductos();
    } catch (err) {
      alert("Error al guardar producto");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este producto?")) return;
    try {
      await eliminarProducto(id);
      cargarProductos();
    } catch (err) {
      alert("Error al eliminar producto");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    window.location.href = "/login";
  };

  if (loading) return <p className="admin-loading">Cargando panel...</p>;
  if (error) return <p className="admin-error">{error}</p>;

  return (
    <div id="admin-container">

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

      {/* ACTION BAR */}
      <div className="admin-actions-bar">
        <button className="admin-add-btn" onClick={abrirCrear}>
          <MdAdd />
          Nuevo producto
        </button>
      </div>

      {/* GRID */}
      <div className="admin-grid">
        {productos.map(p => (
          <div className="admin-card" key={p.id_producto}>

            <div className="admin-img-container">
              <img src={p.imagen_url} alt={p.nombre} />
            </div>

            <div className="admin-info">
              <h3>{p.nombre}</h3>
              <p className="admin-desc">{p.descripcion}</p>

              <p className="admin-price">
                <MdAttachMoney /> {p.precio}
              </p>

              <p className="admin-stock">
                <MdInventory /> Stock: {p.stock}
              </p>
            </div>

            <div className="admin-actions">
              <button onClick={() => abrirEditar(p)}>
                <MdEdit /> Editar
              </button>

              <button
                className="danger"
                onClick={() => handleEliminar(p.id_producto)}
              >
                <MdDelete /> Eliminar
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h2>{modoEditar ? "Editar producto" : "Nuevo producto"}</h2>

            <input
              placeholder="Nombre"
              value={form.nombre}
              onChange={e => setForm({ ...form, nombre: e.target.value })}
            />

            <textarea
              placeholder="Descripción"
              value={form.descripcion}
              onChange={e => setForm({ ...form, descripcion: e.target.value })}
            />

            <input
              type="number"
              placeholder="Precio"
              value={form.precio}
              onChange={e => setForm({ ...form, precio: e.target.value })}
            />

            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={e => setForm({ ...form, stock: e.target.value })}
            />

            {!modoEditar && (
              <input
                type="file"
                accept="image/*"
                onChange={async e => {
                  const base64 = await convertirImagenBase64(e.target.files[0]);
                  setForm({ ...form, imagen: base64 });
                }}
              />
            )}

            <div className="modal-actions">
              <button onClick={handleSubmit}>
                {modoEditar ? "Actualizar" : "Crear"}
              </button>
              <button className="secondary" onClick={() => setMostrarModal(false)}>
                Cancelar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
