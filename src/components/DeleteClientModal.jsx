import React, { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteClientModal({ clientId, onClose, onDeleteSuccess }) {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/clients/${clientId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClient(res.data);
      } catch {
        setError("No se pudo cargar la información del cliente");
      } finally {
        setLoading(false);
      }
    };
    if (clientId) fetchClient();
  }, [clientId]);

  const handleDelete = async () => {
    try {
      setConfirming(true);
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/clients/${clientId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Cliente eliminado correctamente ");
      onDeleteSuccess();
      onClose();
    } catch {
      alert("Error al eliminar el cliente ");
    } finally {
      setConfirming(false);
    }
  };

  if (!clientId) return null;

  return (
    <div style={overlayStyles}>
      <div style={modalStyles}>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <>
            <h2>Eliminar cliente</h2>
            <p>¿Seguro que deseas eliminar este cliente?</p>
            <div style={infoBox}>
              <p><strong>Nombre:</strong> {client.name}</p>
              <p><strong>Cédula:</strong> {client.cedula}</p>
              <p><strong>Email:</strong> {client.email || "N/A"}</p>
              <p><strong>Teléfono:</strong> {client.phone || "N/A"}</p>
            </div>
            <div style={buttonContainer}>
              <button onClick={onClose} style={cancelBtn}>Cancelar</button>
              <button onClick={handleDelete} style={deleteBtn} disabled={confirming}>
                {confirming ? "Eliminando..." : "Eliminar"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}


const overlayStyles = {
  position: "fixed",
  top: 0, left: 0,
  width: "100vw", height: "100vh",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex", justifyContent: "center", alignItems: "center",
  zIndex: 1000,

  
};
