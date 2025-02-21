import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Carregar as reservas do servidor
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/reservations", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReservations(response.data);
      } catch (error) {
        setMessage("Erro ao carregar as reservas.");
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

  // Filtrar as reservas com base na pesquisa
  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.utilizador.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.quarto.numeroQuarto.includes(searchQuery)
  );

  // Atualizar uma reserva (Alterar status e pagamento)
  const handleUpdateReservation = async (id, status, pago) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/reservations/${id}`,
        { status, pago },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Reserva atualizada com sucesso.");
      setReservations(reservations.map((reservation) =>
        reservation._id === id
          ? { ...reservation, status, pago }
          : reservation
      ));
    } catch (error) {
      setMessage("Erro ao atualizar reserva.");
    }
  };

  // Deletar uma reserva
  const handleDeleteReservation = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(reservations.filter((reservation) => reservation._id !== id));
      setMessage("Reserva eliminada com sucesso.");
    } catch (error) {
      setMessage("Erro ao eliminar reserva.");
    }
  };

  return (
    <div>
      <h2>Gestão de Reservas</h2>
      {message && <p>{message}</p>}

      {/* Campo de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar por nome do utilizador ou número do quarto"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <h3>Lista de Reservas</h3>
      <table>
        <thead>
          <tr>
            <th>Utilizador</th>
            <th>Quarto</th>
            <th>Data Check-In</th>
            <th>Data Check-Out</th>
            <th>Status</th>
            <th>Pago</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.utilizador.nome}</td>
              <td>{reservation.quarto.numeroQuarto}</td>
              <td>{new Date(reservation.dataCheckIn).toLocaleDateString()}</td>
              <td>{new Date(reservation.dataCheckOut).toLocaleDateString()}</td>
              <td>{reservation.status}</td>
              <td>{reservation.pago ? "Sim" : "Não"}</td>
              <td>
                <button
                  onClick={() => navigate(`/admin/reservations/${reservation._id}`)}
                >
                  Ver Detalhes
                </button>
                <button
                  onClick={() => handleUpdateReservation(reservation._id, "confirmada", true)}
                  style={{ backgroundColor: "green", color: "white" }}
                >
                  Confirmar
                </button>
                <button
                  onClick={() => handleDeleteReservation(reservation._id)}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminReservations;
