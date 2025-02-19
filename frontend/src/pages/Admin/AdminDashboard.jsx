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
    <div>
      <h2>Dashboard Admin</h2>
      <p>{message}</p>
      <nav>
        <ul>
          <li>
            <button onClick={() => navigate("/admin/users")}>Gestão de Utilizadores</button>
          </li>
          <li>
            <button onClick={() => navigate("/admin/rooms")}>Gestão de Quartos</button>
          </li>
          <li>
            <button onClick={() => navigate("/admin/reservations")}>Gestão de Reservas</button>
          </li>
          <li>
            <button onClick={() => navigate("/admin/reviews")}>Gestão de Reviews</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminDashboard;
