import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateRoom() {
  const [roomData, setRoomData] = useState({
    nome: "",
    descricao: "",
    imagem: "",
    numeroQuarto: "",
    precoPorNoite: "",
    status: "disponível",
  });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!roomData.numeroQuarto || roomData.numeroQuarto.trim() === "") {
      setMessage("O número do quarto é obrigatório.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/admin/rooms",
        roomData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Quarto criado com sucesso!");
      navigate("/admin/rooms");
    } catch (error) {
      console.error("Erro ao criar quarto:", error);
      setMessage("Erro ao criar quarto.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-color1">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-color4 text-center mb-4">Criar Quarto</h2>
        {message && (
          <p className={`text-center mb-4 ${message.includes("sucesso") ? "text-green-600" : "text-red-500"}`}>
            {message}
          </p>
        )}
        
        <form onSubmit={handleCreateRoom} className="space-y-4">
          <div>
            <label className="block font-semibold">Nome do Quarto:</label>
            <input
              type="text"
              name="nome"
              value={roomData.nome}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded-md focus:ring focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block font-semibold">Descrição:</label>
            <textarea
              name="descricao"
              value={roomData.descricao}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded-md focus:ring focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block font-semibold">Imagem (URL):</label>
            <input
              type="text"
              name="imagem"
              value={roomData.imagem}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded-md focus:ring focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block font-semibold">Número do Quarto:</label>
            <input
              type="text"
              name="numeroQuarto"
              value={roomData.numeroQuarto}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded-md focus:ring focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block font-semibold">Preço por Noite:</label>
            <input
              type="number"
              name="precoPorNoite"
              value={roomData.precoPorNoite}
              onChange={handleInputChange}
              required
              className="w-full border p-2 rounded-md focus:ring focus:outline-none"
            />
          </div>
          
          <div>
            <label className="block font-semibold">Status:</label>
            <select
              name="status"
              value={roomData.status}
              onChange={handleInputChange}
              className="w-full border p-2 rounded-md focus:ring focus:outline-none"
            >
              <option value="disponível">Disponível</option>
              <option value="ocupado">Ocupado</option>
              <option value="manutenção">Manutenção</option>
            </select>
          </div>
          
          <button 
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
          >
            Criar Quarto
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateRoom;
