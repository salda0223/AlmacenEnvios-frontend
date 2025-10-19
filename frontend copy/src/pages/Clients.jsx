import { useEffect, useState } from "react";
import { getClients, createClient } from "../api";
import ClientModal from "../components/ClientModal";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: "", cedula: "", email: "", phone: "" });
  const [msg, setMsg] = useState("");
  const [showModal, setShowModal] = useState(false);

  const fetch = async () => {
    try {
      const res = await getClients();
      setClients(res.data);
    } catch {
      setMsg("Error al cargar clientes");
    }
  };

  useEffect(() => { fetch(); }, []);

  const handleCreate = async () => {
    try {
      await createClient(form);
      setForm({ name: "", cedula: "", email: "", phone: "" });
      fetch();
      setShowModal(false);
    } catch (err) {
      setMsg("No se pudo crear cliente");
    }
  };

  return (
    <div>
      <h2>Clientes</h2>
      <button onClick={() => setShowModal(true)}>+ Agregar cliente</button>
      <p>{msg}</p>
      <ul>
        {clients.map((c) => (
          <li key={c._id}>
            {c.name} — {c.cedula} — {c.email}
          </li>
        ))}
      </ul>

      <ClientModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreate}
        form={form}
        setForm={setForm}
      />
    </div>
  );
}
