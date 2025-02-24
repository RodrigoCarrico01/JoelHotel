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
      navigate("/admin/rooms");
    } catch (error) {
      setMessage("Erro ao atualizar quarto.");
    }
  };

  if (!room) return <p className="text-center text-lg text-gray-600">Carregando dados do quarto...</p>;

  return (
    <div className="flex justify-center items-center h-screen bg-color1">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-color4 text-center mb-4">Editar Quarto: {room.nome}</h2>
        {message && (
          <p className={`text-center mb-4 ${message.includes("sucesso") ? "text-green-600" : "text-red-500"}`}>
            {message}
          </p>
        )}
        
        <form onSubmit={handleEditRoom} className="space-y-4">
          <div>
            <label className="block font-semibold">Nome do Quarto:</label>
            <input
              type="text"
              value={updatedRoom.nome}
              onChange={(e) => setUpdatedRoom({ ...updatedRoom, nome: e.target.value })}
              required
              className="w-full border p-2 rounded-md focus:ring focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block font-semibold">Descrição:</label>
            <textarea
              value={updatedRoom.descricao}
              onChange={(e) => setUpdatedRoom({ ...updatedRoom, descricao: e.target.value })}
              required
              className="w-full border p-2 rounded-md focus:ring focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block font-semibold">Número do Quarto:</label>
            <input
              type="text"
              value={updatedRoom.numeroQuarto}
              onChange={(e) => setUpdatedRoom({ ...updatedRoom, numeroQuarto: e.target.value })}
              required
              className="w-full border p-2 rounded-md focus:ring focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block font-semibold">Preço por Noite:</label>
            <input
              type="number"
              value={updatedRoom.precoPorNoite}
              onChange={(e) => setUpdatedRoom({ ...updatedRoom, precoPorNoite: e.target.value })}
              required
              className="w-full border p-2 rounded-md focus:ring focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block font-semibold">Status:</label>
            <select
              value={updatedRoom.status}
              onChange={(e) => setUpdatedRoom({ ...updatedRoom, status: e.target.value })}
              className="w-full border p-2 rounded-md focus:ring focus:outline-none"
            >
              <option value="disponível">Disponível</option>
              <option value="indisponível">Indisponível</option>
            </select>
          </div>
          
          <div>
            <label className="block font-semibold">Imagem URL:</label>
            <input
              type="text"
              value={updatedRoom.imagem}
              onChange={(e) => setUpdatedRoom({ ...updatedRoom, imagem: e.target.value })}
              required
              className="w-full border p-2 rounded-md focus:ring focus:outline-none"
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Atualizar Quarto
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditRoom;
