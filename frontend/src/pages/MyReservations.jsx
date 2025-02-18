import { useState, useEffect } from "react";
import axios from "axios";
import Notification from "../components/Notification";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/reservations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservations(response.data);
      } catch (err) {
        setNotification({ message: "Erro ao carregar reservas.", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [token]);

  const handleCancelReservation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReservations(reservations.filter((reservation) => reservation._id !== id));
      setNotification({ message: "Reserva cancelada com sucesso!", type: "success" });
    } catch (err) {
      setNotification({ message: "Erro ao cancelar a reserva.", type: "error" });
    }
  };

  if (loading) return <p>A carregar reservas...</p>;

  return (
    <div>
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "" })} />

      <h2>Minhas Reservas</h2>
      {reservations.length === 0 ? (
        <p>Não tens reservas no momento.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
          {reservations.map((reservation) => (
            <div key={reservation._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
              <h3>Quarto: {reservation.quarto.nome}</h3>
              <img src={reservation.quarto.imagem} alt={reservation.quarto.nome} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
              <p><strong>Check-in:</strong> {new Date(reservation.dataCheckIn).toLocaleDateString()}</p>
              <p><strong>Check-out:</strong> {new Date(reservation.dataCheckOut).toLocaleDateString()}</p>
              <p><strong>Status:</strong> {reservation.status}</p>
              {reservation.status === "pendente" && (
                <button onClick={() => handleCancelReservation(reservation._id)} style={{ backgroundColor: "red", color: "white" }}>
                  Apagar Reserva
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyReservations;
