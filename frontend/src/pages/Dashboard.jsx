import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Erro ao carregar o dashboard.");
        if (error.response?.status === 403) {
          // Se não for admin, redirecionar
          navigate("/");
        }
      }
    };

    if (token) {
      fetchDashboardData();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <h2>{message}</h2>
      {/* Mais dados do dashboard podem ser exibidos aqui */}
    </div>
  );
}

export default Dashboard;
