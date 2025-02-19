import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditRoom() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState("");
  const [updatedRoom, setUpdatedRoom] = useState({
    nome: "",
    descricao: "",
    numeroQuarto: "",
    precoPorNoite: "",
    status: "disponível",
    imagem: "",
  });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Carregar os dados do quarto para edição
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/rooms/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRoom(response.data);
        setUpdatedRoom({
          nome: response.data.nome,
          descricao: response.data.descricao,
          numeroQuarto: response.data.numeroQuarto,
          precoPorNoite: response.data.precoPorNoite,
          status: response.data.status,
          imagem: response.data.imagem,
        });
      } catch (error) {
        setMessage("Erro ao carregar dados do quarto.");
      }
    };

    fetchRoomData();
  }, [id, token]);

  const handleEditRoom = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.put(`http://localhost:5000/api/admin/rooms/${id}`, updatedRoom, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Quarto atualizado com sucesso!");
      navigate("/admin/rooms"); // Redireciona para a lista de quartos
    } catch (error) {
      setMessage("Erro ao atualizar quarto.");
    }
  };

  if (!room) return <p>Carregando dados do quarto...</p>;

  return (
    <div>
      <h2>Editar Quarto: {room.nome}</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleEditRoom}>
        <input
          type="text"
          placeholder="Nome"
          value={updatedRoom.nome}
          onChange={(e) => setUpdatedRoom({ ...updatedRoom, nome: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descrição"
          value={updatedRoom.descricao}
          onChange={(e) => setUpdatedRoom({ ...updatedRoom, descricao: e.target.value })}
        />
        <input
          type="text"
          placeholder="Número do Quarto"
          value={updatedRoom.numeroQuarto}
          onChange={(e) => setUpdatedRoom({ ...updatedRoom, numeroQuarto: e.target.value })}
        />
        <input
          type="number"
          placeholder="Preço por noite"
          value={updatedRoom.precoPorNoite}
          onChange={(e) => setUpdatedRoom({ ...updatedRoom, precoPorNoite: e.target.value })}
        />
        <select
          value={updatedRoom.status}
          onChange={(e) => setUpdatedRoom({ ...updatedRoom, status: e.target.value })}
        >
          <option value="disponível">Disponível</option>
          <option value="indisponível">Indisponível</option>
        </select>
        <input
          type="text"
          placeholder="Imagem URL"
          value={updatedRoom.imagem}
          onChange={(e) => setUpdatedRoom({ ...updatedRoom, imagem: e.target.value })}
        />
        <button type="submit">Atualizar Quarto</button>
      </form>
    </div>
  );
}

export default EditRoom;
