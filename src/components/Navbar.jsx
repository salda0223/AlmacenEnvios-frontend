import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
      <Link to="/" style={{ marginRight: 12 }}>Inicio</Link>
      {token ? (
        <>
          {user?.role === "admin" && (
            <>
              <Link to="/products" style={{ marginRight: 12 }}>Productos</Link>
              <Link to="/clients" style={{ marginRight: 12 }}>Clientes</Link>
              <Link to="/users" style={{ marginRight: 12 }}>Usuarios</Link>
            </>
          )}
          <Link to="/sales" style={{ marginRight: 12 }}>Ventas</Link>
          <button onClick={handleLogout}>Salir</button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: 12 }}>Login</Link>
          <Link to="/register">Registro</Link>
        </>
      )}
    </nav>
  );
}
