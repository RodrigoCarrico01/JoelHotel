import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/rooms", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRooms(response.data);
      } catch (error) {
        setMessage("Erro ao carregar os quartos.");
        if (error.response?.status === 403) {
          navigate("/");
        }
      }
    };

    if (token) {
      fetchRooms();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const filteredRooms = rooms.filter(
    (room) =>
      room.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.numeroQuarto.toString().includes(searchQuery)
  );

  const handleDeleteRoom = async (roomId) => {
    try {
      const confirmDelete = window.confirm("Tem certeza que deseja excluir este quarto?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:5000/api/admin/rooms/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRooms(rooms.filter((room) => room._id !== roomId));
        setMessage("Quarto excluído com sucesso!");
      }
    } catch (error) {
      setMessage("Erro ao excluir o quarto.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-color4 text-center mb-6">Gestão de Quartos</h2>
      {message && <p className="text-center text-lg text-gray-600">{message}</p>}

      {/* Campo de pesquisa */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Pesquisar por nome ou número do quarto"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md w-full md:w-1/2"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Nome</th>
              <th className="border border-gray-300 p-2">Número</th>
              <th className="border border-gray-300 p-2">Preço</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room) => (
              <tr key={room._id} className="text-center">
                <td className="border border-gray-300 p-2">{room.nome}</td>
                <td className="border border-gray-300 p-2">{room.numeroQuarto}</td>
                <td className="border border-gray-300 p-2">{room.precoPorNoite}€</td>
                <td className="border border-gray-300 p-2">{room.status}</td>
                <td className="border border-gray-300 p-2 flex flex-col space-y-2">
                  <button 
                    onClick={() => navigate(`/admin/rooms/${room._id}/edit`)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDeleteRoom(room._id)}
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

      {/* Botão de Criar Novo Quarto */}
      <div className="flex justify-center mt-6">
        <button 
          onClick={() => navigate("/admin/rooms/create")}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition"
        >
          Criar Novo Quarto
        </button>
      </div>
    </div>
  );
}

export default AdminRooms;
