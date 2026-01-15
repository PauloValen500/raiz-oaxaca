const API_URL = "https://jrxdn3tga4.execute-api.us-east-2.amazonaws.com/prod";

// ---------- AUTH ----------
export async function login(data) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function signup(data) {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

// ---------- PRODUCTOS ----------
export async function obtenerProductos() {
  const res = await fetch(`${API_URL}/productos`);
  return res.json();
}

export async function crearProducto(data) {
  const res = await fetch(`${API_URL}/producto`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function editarProducto(data) {
  const res = await fetch(`${API_URL}/producto`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function eliminarProducto(id_producto) {
  const res = await fetch(`${API_URL}/producto`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_producto })
  });
  return res.json();
}

// ---------- USUARIOS ----------
export async function obtenerUsuarios() {
  const res = await fetch(`${API_URL}/usuarios`);
  return res.json();
}

export async function eliminarUsuario(id_usuario) {
  const res = await fetch(`${API_URL}/usuario`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id_usuario })
  });
  return res.json();
}
