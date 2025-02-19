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

  // Função para lidar com as mudanças nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    setMessage("");
  
    // Verifique se o numeroQuarto foi preenchido
    if (!roomData.numeroQuarto || roomData.numeroQuarto.trim() === "") {
      setMessage("O número do quarto é obrigatório.");
      return;
    }
  
    try {
      // Verifique o conteúdo de roomData no console
      console.log(roomData);
  
      await axios.post(
        "http://localhost:5000/api/admin/rooms",
        roomData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Quarto criado com sucesso!");
      navigate("/admin/rooms"); // Redireciona para a lista de quartos do admin
    } catch (error) {
      console.error("Erro ao criar quarto:", error);
      setMessage("Erro ao criar quarto.");
    }
  };
  
  

  return (
    <div>
      <h2>Criar Quarto</h2>
      {message && <p style={{ color: message.includes("sucesso") ? "green" : "red" }}>{message}</p>}
      <form onSubmit={handleCreateRoom}>
        <div>
          <label>Nome do Quarto:</label>
          <input
            type="text"
            name="nome"
            value={roomData.nome}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea
            name="descricao"
            value={roomData.descricao}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Imagem (URL):</label>
          <input
            type="text"
            name="imagem"
            value={roomData.imagem}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Número do Quarto:</label>
          <input
            type="text"
            name="numeroQuarto"
            value={roomData.numeroQuarto}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Preço por Noite:</label>
          <input
            type="number"
            name="precoPorNoite"
            value={roomData.precoPorNoite}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={roomData.status}
            onChange={handleInputChange}
          >
            <option value="disponível">Disponível</option>
            <option value="ocupado">Ocupado</option>
            <option value="manutenção">Manutenção</option>
          </select>
        </div>
        <button type="submit">Criar Quarto</button>
      </form>
    </div>
  );
}

export default CreateRoom;
