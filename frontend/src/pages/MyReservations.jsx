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

  if (loading) return <p className="text-center text-lg text-gray-600">A carregar reservas...</p>;

  return (
    <div className="container mx-auto p-6">
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "" })} />

      <h2 className="text-3xl font-bold text-color4 text-center mb-6">Minhas Reservas</h2>

      {reservations.length === 0 ? (
        <p className="text-center text-gray-600">Não tens reservas no momento.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservations.map((reservation) => (
            <div key={reservation._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <img 
                src={reservation.quarto.imagem} 
                alt={reservation.quarto.nome} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">Quarto: {reservation.quarto.nome}</h3>
                <p className="text-gray-600"><strong>Check-in:</strong> {new Date(reservation.dataCheckIn).toLocaleDateString()}</p>
                <p className="text-gray-600"><strong>Check-out:</strong> {new Date(reservation.dataCheckOut).toLocaleDateString()}</p>
                <p className={`mt-2 font-semibold ${reservation.status === "pendente" ? "text-yellow-500" : "text-green-500"}`}>
                  <strong>Status:</strong> {reservation.status}
                </p>

                {reservation.status === "pendente" && (
                  <button 
                    onClick={() => handleCancelReservation(reservation._id)} 
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-full hover:bg-red-600 transition"
                  >
                    Cancelar Reserva
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <h3 className="text-2xl font-semibold text-color4 mt-8 text-center">Fazer uma Nova Reserva</h3>

      <form onSubmit={handleCreateReservation} className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md max-w-lg mx-auto">
        <label className="block font-semibold mb-2">Escolha um quarto:</label>
        <select 
          value={selectedRoom} 
          onChange={(e) => setSelectedRoom(e.target.value)} 
          required 
          className="border p-2 rounded-md w-full"
        >
          <option value="">Selecione um quarto</option>
          {rooms.map((room) => (
            <option key={room._id} value={room._id}>
              {room.nome} - Quarto {room.numeroQuarto} - {room.precoPorNoite}€
            </option>
          ))}
        </select>

        <label className="block font-semibold mt-4">Data de Check-in:</label>
        <input 
          type="date" 
          value={checkInDate} 
          onChange={(e) => setCheckInDate(e.target.value)} 
          required 
          className="border p-2 rounded-md w-full"
        />

        <label className="block font-semibold mt-4">Data de Check-out:</label>
        <input 
          type="date" 
          value={checkOutDate} 
          onChange={(e) => setCheckOutDate(e.target.value)} 
          required 
          className="border p-2 rounded-md w-full"
        />

        <button 
          type="submit" 
          className="mt-6 bg-color4 text-white px-4 py-2 rounded-md w-full hover:bg-color3 transition"
        >
          Reservar
        </button>
      </form>
    </div>
  );
}

export default MyReservations;
