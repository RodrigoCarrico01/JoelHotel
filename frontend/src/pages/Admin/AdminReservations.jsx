import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.utilizador.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.quarto.numeroQuarto.toString().includes(searchQuery)
  );

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
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-color4 text-center mb-6">Gestão de Reservas</h2>
      {message && <p className="text-center text-lg text-gray-600">{message}</p>}

      {/* Campo de pesquisa */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Pesquisar por nome do utilizador ou número do quarto"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-full md:w-1/2"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Utilizador</th>
              <th className="border border-gray-300 p-2">Quarto</th>
              <th className="border border-gray-300 p-2">Check-In</th>
              <th className="border border-gray-300 p-2">Check-Out</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Pago</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation._id} className="text-center">
                <td className="border border-gray-300 p-2">{reservation.utilizador.nome}</td>
                <td className="border border-gray-300 p-2">{reservation.quarto.numeroQuarto}</td>
                <td className="border border-gray-300 p-2">{new Date(reservation.dataCheckIn).toLocaleDateString()}</td>
                <td className="border border-gray-300 p-2">{new Date(reservation.dataCheckOut).toLocaleDateString()}</td>
                <td className={`border border-gray-300 p-2 font-semibold ${reservation.status === "pendente" ? "text-yellow-500" : "text-green-500"}`}>
                  {reservation.status}
                </td>
                <td className={`border border-gray-300 p-2 ${reservation.pago ? "text-green-600" : "text-red-500"}`}>
                  {reservation.pago ? "Sim" : "Não"}
                </td>
                <td className="border border-gray-300 p-2 flex flex-col space-y-2">
                  <button
                    onClick={() => handleUpdateReservation(reservation._id, "confirmada", true)}
                    className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition"
                  >
                    Confirmar
                  </button>
                  <button
                    onClick={() => handleDeleteReservation(reservation._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminReservations;
