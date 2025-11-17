import { useEffect, useState } from "react";
import { getUsers, updateUser, deleteUser } from "../api";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [search, setSearch] = useState(""); 
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    fetchUsers();
  }, []);


  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
      setFilteredUsers(res.data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filtered = users.filter(
      (u) =>
        u.name.toLowerCase().includes(value) ||
        u.email.toLowerCase().includes(value)
    );
    setFilteredUsers(filtered);
  };

  const handleEdit = (user) => {
    setEditing(user._id);
    setFormData({ name: user.name, email: user.email, role: user.role });
  };

  const handleUpdate = async (id) => {
    await updateUser(id, formData);
    setEditing(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este usuario?")) {
      await deleteUser(id);
      fetchUsers();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gestión de Usuarios</h2>

     
      <input
        type="text"
        placeholder="Buscar por nombre o correo..."
        value={search}
        onChange={handleSearch}
        style={{
          marginTop: "10px",
          padding: "8px",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />

      <table
        border="1"
        cellPadding="10"
        style={{ width: "100%", marginTop: "20px" }}
      >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((u) => (
              <tr key={u._id}>
                <td>
                  {editing === u._id ? (
                    <input
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  ) : (
                    u.name
                  )}
                </td>
                <td>
                  {editing === u._id ? (
                    <input
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  ) : (
                    u.email
                  )}
                </td>
                <td>
                  {editing === u._id ? (
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value })
                      }
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    u.role
                  )}
                </td>
                <td>
                  {editing === u._id ? (
                    <>
                      <button onClick={() => handleUpdate(u._id)}>
                        Guardar
                      </button>
                      <button onClick={() => setEditing(null)}>Cancelar</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(u)}>Editar</button>
                      <button onClick={() => handleDelete(u._id)}>
                        Eliminar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No se encontraron usuarios
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

