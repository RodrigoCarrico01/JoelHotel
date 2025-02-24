import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(response.data.message);
      } catch (error) {
        setMessage("Erro ao carregar o dashboard.");
        if (error.response?.status === 403) {
          navigate("/");
        }
      }
    };

    if (token) {
      fetchAdminData();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-color1">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
        <h2 className="text-3xl font-bold text-color4 mb-4">Dashboard Admin</h2>
        <p className="text-gray-600 mb-6">{message}</p>

        <nav>
          <ul className="space-y-4">
            <li>
              <button 
                onClick={() => navigate("/admin/users")} 
                className="bg-color4 text-white px-4 py-2 rounded-md w-full hover:bg-color3 transition"
              >
                Gestão de Utilizadores
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate("/admin/rooms")} 
                className="bg-color4 text-white px-4 py-2 rounded-md w-full hover:bg-color3 transition"
              >
                Gestão de Quartos
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate("/admin/reservations")} 
                className="bg-color4 text-white px-4 py-2 rounded-md w-full hover:bg-color3 transition"
              >
                Gestão de Reservas
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate("/admin/reviews")} 
                className="bg-color4 text-white px-4 py-2 rounded-md w-full hover:bg-color3 transition"
              >
                Gestão de Reviews
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default AdminDashboard;
