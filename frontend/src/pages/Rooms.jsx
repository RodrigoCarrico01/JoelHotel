import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/rooms");
        setRooms(response.data);
      } catch (err) {
        setError("Erro ao carregar os quartos.");
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  if (loading) return <p>A carregar quartos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Lista de Quartos</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {rooms.map((room) => (
          <div key={room._id} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
            <img src={room.imagem} alt={room.nome} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
            <h3>{room.nome}</h3>
            <Link to={`/rooms/${room._id}`}>
              <button>Ver Detalhes</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
