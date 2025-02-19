import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Para armazenar a query de pesquisa
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
        setFilteredUsers(response.data); // Inicialmente, mostra todos os utilizadores
      } catch (error) {
        setMessage(error.response?.data?.message || "Erro ao carregar utilizadores.");
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

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((user) => user._id !== id));
      setMessage("Utilizador eliminado com sucesso!");
    } catch (error) {
      setMessage("Erro ao eliminar utilizador.");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = users.filter(user =>
      user.nome.toLowerCase().includes(e.target.value.toLowerCase()) ||
      user.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
      user.role.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered); // Atualiza os utilizadores filtrados com base na pesquisa
  };

  return (
    <div>
      <h2>Gestão de Utilizadores</h2>
      {message && <p>{message}</p>}

      {/* Campo de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar.."
        value={searchQuery}
        onChange={handleSearch}
        className="mb-4 p-2 border rounded"
      />

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Role</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.nome}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)} style={{ backgroundColor: "red", color: "white" }}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;
