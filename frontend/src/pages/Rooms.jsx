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

  if (loading) return <p className="text-center text-lg text-gray-600">A carregar quartos...</p>;
  if (error) return <p className="text-center text-red-500 text-lg">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-color4 text-center mb-6">Lista de Quartos</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img 
              src={room.imagem} 
              alt={room.nome} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800">{room.nome}</h3>
              <Link to={`/rooms/${room._id}`}>
                <button className="mt-4 bg-color4 text-white px-4 py-2 rounded-md w-full hover:bg-color3 transition">
                  Ver Detalhes
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Rooms;
