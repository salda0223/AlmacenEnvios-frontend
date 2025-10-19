import { useEffect, useState } from "react";
import { getSales, createSale, getProducts, getClients } from "../api";

export default function Sales() {
  const [sales, setSales] = useState([]);
  const [products, setProducts] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ clientId: "", productIds: [], paymentMethod: "efectivo" });
  const [msg, setMsg] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setProducts((await getProducts()).data);
        setClients((await getClients()).data);
        setSales((await getSales()).data);
      } catch { setMsg("Error cargando datos"); }
    })();
  }, []);

  const toggleProduct = (id) => {
    setForm((f) => {
      const exists = f.productIds.includes(id);
      return { ...f, productIds: exists ? f.productIds.filter(x => x !== id) : [...f.productIds, id] };
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.clientId || form.productIds.length === 0) { setMsg("Cliente y al menos 1 producto"); return; }
    try {
      await createSale(form);
      setMsg("Venta creada");
      setSales((await getSales()).data);
      setForm({ clientId: "", productIds: [], paymentMethod: "efectivo" });
    } catch (err) {
      setMsg("No se pudo crear venta");
    }
  };

  return (
    <div>
      <h2>Ventas</h2>
      <form onSubmit={submit}>
        <select value={form.clientId} onChange={e => setForm({...form, clientId:e.target.value})} required>
          <option value="">Seleccionar cliente</option>
          {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>

        <div>
          <p>Seleccionar productos (marcar):</p>
          {products.map(p => (
            <label key={p._id} style={{display:"block"}}>
              <input type="checkbox" checked={form.productIds.includes(p._id)} onChange={()=>toggleProduct(p._id)} />
              {p.name} — ${p.price}
            </label>
          ))}
        </div>

        <select value={form.paymentMethod} onChange={e=>setForm({...form, paymentMethod:e.target.value})}>
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta">Tarjeta</option>
        </select>

        <button type="submit">Crear venta</button>
      </form>

      <p>{msg}</p>

      <h3>Ventas registradas</h3>
      <ul>
        {sales.map(s => (
          <li key={s._id}>
            {s.client?.name || s.client} • Total: ${s.totalValue} • Envío: ${s.shippingCost}
          </li>
        ))}
      </ul>
    </div>
  );
}
