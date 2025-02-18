import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
        setRoom(response.data);
      } catch (err) {
        setError("Erro ao carregar detalhes do quarto.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) return <p>A carregar detalhes do quarto...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!room) return <p>Quarto não encontrado.</p>;

  return (
    <div>
      <h2>{room.nome}</h2>
      <img src={room.imagem} alt={room.nome} style={{ width: "100%", height: "400px", objectFit: "cover" }} />
      <p>{room.descricao}</p>
    </div>
  );
}

export default RoomDetails;
