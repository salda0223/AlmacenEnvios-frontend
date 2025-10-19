import { useState } from "react";
import { registerUser } from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ name: "", cedula: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await registerUser(form);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setMsg(`Usuario creado: ${res.data.name}`);
        navigate("/products");
      } else {
        setMsg("Usuario creado");
        navigate("/login");
      }
    } catch (error) {
      setMsg(error.response?.data?.message || error.response?.data?.msg || error.message);
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" onChange={handleChange} required />
        <input name="cedula" placeholder="Cédula" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Correo" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
      <p>{msg}</p>
    </div>
  );
}
