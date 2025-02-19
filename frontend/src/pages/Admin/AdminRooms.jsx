import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminRooms() {
  const [rooms, setRooms] = useState([]);
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
        setMessage(error.response?.data?.message || "Erro ao carregar quartos.");
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

  const handleDeleteRoom = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/rooms/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRooms(rooms.filter((room) => room._id !== id)); // Remove o quarto da lista
      setMessage("Quarto eliminado com sucesso!");
    } catch (error) {
      setMessage("Erro ao eliminar quarto.");
    }
  };

  return (
    <div>
      <h2>Gestão de Quartos</h2>
      {message && <p>{message}</p>}
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Número do Quarto</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room._id}>
              <td>{room.nome}</td>
              <td>{room.numeroQuarto}</td>
              <td>
                <button onClick={() => navigate(`/admin/rooms/${room._id}`)}>Editar</button>
                <button onClick={() => handleDeleteRoom(room._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate("/admin/rooms/new")}>Adicionar Quarto</button>
    </div>
  );
}

export default AdminRooms;
