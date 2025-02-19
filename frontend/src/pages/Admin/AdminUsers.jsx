// src/pages/Admin/AdminUsers.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(response.data);
      } catch (error) {
        setMessage(error.response?.data?.message || "Erro ao carregar usuários.");
        if (error.response?.status === 403) {
          navigate("/");
        }
      }
    };

    if (token) {
      fetchUsers();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  return (
    <div>
      <h2>Gestão de Utilizadores</h2>
      {message && <p>{message}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>{user.nome} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminUsers;
