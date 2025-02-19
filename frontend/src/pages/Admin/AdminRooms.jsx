import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Carregar os quartos do servidor
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

  // Filtrar os quartos com base na pesquisa
  const filteredRooms = rooms.filter(
    (room) =>
      room.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.numeroQuarto.includes(searchQuery)
  );

  // Função para excluir o quarto
  const handleDeleteRoom = async (roomId) => {
    try {
      const confirmDelete = window.confirm("Tem certeza que deseja excluir este quarto?");
      if (confirmDelete) {
        await axios.delete(`http://localhost:5000/api/admin/rooms/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRooms(rooms.filter((room) => room._id !== roomId)); // Atualiza a lista de quartos
        setMessage("Quarto excluído com sucesso!");
      }
    } catch (error) {
      setMessage("Erro ao excluir o quarto.");
    }
  };

  return (
    <div>
      <h2>Gestão de Quartos</h2>
      {message && <p>{message}</p>}

      {/* Campo de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar por nome ou número do quarto"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      <h3>Lista de Quartos</h3>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Número do Quarto</th>
            <th>Preço</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((room) => (
            <tr key={room._id}>
              <td>{room.nome}</td>
              <td>{room.numeroQuarto}</td>
              <td>{room.precoPorNoite}€</td>
              <td>{room.status}</td>
              <td>
                <button onClick={() => navigate(`/admin/rooms/${room._id}/edit`)}>Editar</button>
                <button onClick={() => handleDeleteRoom(room._id)} style={{ backgroundColor: "red", color: "white" }}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Botão de Criar Novo Quarto */}
      <button onClick={() => navigate("/admin/rooms/create")}>Criar Novo Quarto</button>
    </div>
  );
}

export default AdminRooms;
