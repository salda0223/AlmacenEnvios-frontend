import { useEffect, useState } from "react";
import { getProducts, createProduct } from "../api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", weight: "" });
  const [msg, setMsg] = useState("");

  const fetch = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      setMsg("Error cargando productos");
    }
  };

  useEffect(() => { fetch(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({ name: form.name, price: Number(form.price), weight: Number(form.weight) });
      setForm({ name: "", price: "", weight: "" });
      fetch();
    } catch (err) {
      setMsg(err.response?.data?.message || "No se pudo crear producto");
    }
  };

  return (
    <div>
      <h2>Productos</h2>
      <form onSubmit={submit}>
        <input placeholder="Nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Precio" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input placeholder="Peso (kg)" value={form.weight} onChange={(e) => setForm({ ...form, weight: e.target.value })} required />
        <button type="submit">Agregar</button>
      </form>
      <p>{msg}</p>
      <ul>
        {products.map((p) => (
          <li key={p._id}>{p.name} — ${p.price} — {p.weight}kg</li>
        ))}
      </ul>
    </div>
  );
}
