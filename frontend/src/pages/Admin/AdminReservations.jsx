import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/reservations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservations(response.data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Erro ao carregar reservas.");
        if (error.response?.status === 403) {
          navigate("/");
        }
      }
    };

    if (token) {
      fetchReservations();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleDeleteReservation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(reservations.filter((reservation) => reservation._id !== id)); // Remove a reserva da lista
      setMessage("Reserva eliminada com sucesso!");
    } catch (error) {
      setMessage("Erro ao eliminar reserva.");
    }
  };

  const handleUpdateReservation = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/reservations/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Status da reserva atualizado!");
      setReservations(
        reservations.map((reservation) =>
          reservation._id === id ? { ...reservation, status } : reservation
        )
      );
    } catch (error) {
      setMessage("Erro ao atualizar status da reserva.");
    }
  };

  return (
    <div>
      <h2>Gestão de Reservas</h2>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Quarto</th>
            <th>Data de Check-in</th>
            <th>Data de Check-out</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.quarto.nome}</td>
              <td>{new Date(reservation.dataCheckIn).toLocaleDateString()}</td>
              <td>{new Date(reservation.dataCheckOut).toLocaleDateString()}</td>
              <td>{reservation.status}</td>
              <td>
                <button onClick={() => handleUpdateReservation(reservation._id, "confirmada")}>Confirmar</button>
                <button onClick={() => handleUpdateReservation(reservation._id, "cancelada")}>Cancelar</button>
                <button onClick={() => handleDeleteReservation(reservation._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminReservations;
