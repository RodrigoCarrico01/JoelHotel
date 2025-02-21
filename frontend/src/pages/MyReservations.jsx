import { useState, useEffect } from "react";
import axios from "axios";
import Notification from "../components/Notification";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [selectedRoom, setSelectedRoom] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
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

    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rooms");
        setRooms(response.data);
      } catch (err) {
        setNotification({ message: "Erro ao carregar os quartos.", type: "error" });
      }
    };

    fetchReservations();
    fetchRooms();
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

  const handleCreateReservation = async (e) => {
    e.preventDefault();

    if (!selectedRoom || !checkInDate || !checkOutDate) {
      setNotification({ message: "Preencha todos os campos!", type: "error" });
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/reservations",
        { quarto: selectedRoom, dataCheckIn: checkInDate, dataCheckOut: checkOutDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotification({ message: "Reserva criada com sucesso!", type: "success" });
      setSelectedRoom("");
      setCheckInDate("");
      setCheckOutDate("");
    } catch (err) {
      setNotification({ message: "Erro ao criar a reserva.", type: "error" });
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
                  Cancelar Reserva
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <h3>Fazer uma Nova Reserva</h3>
      <form onSubmit={handleCreateReservation} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
        <label>Escolha um quarto:</label>
        <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} required>
          <option value="">Selecione um quarto</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.nome} - Quarto {room.numeroQuarto} - {room.precoPorNoite}€
            </option>
          ))}
        </select>

        <label>Data de Check-in:</label>
        <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} required />

        <label>Data de Check-out:</label>
        <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} required />

        <button type="submit" style={{ backgroundColor: "green", color: "white", padding: "10px", borderRadius: "5px" }}>
          Reservar
        </button>
      </form>
    </div>
  );
}

export default MyReservations;
