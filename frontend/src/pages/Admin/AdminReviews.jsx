import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/Notification";

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/reviews", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReviews(response.data);
      } catch (error) {
        setNotification({ message: "Erro ao carregar reviews.", type: "error" });
        if (error.response?.status === 403) {
          navigate("/");
        }
      }
    };

    if (token) {
      fetchReviews();
    } else {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleDeleteReview = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReviews(reviews.filter((review) => review._id !== id));
      setNotification({ message: "Review eliminada com sucesso!", type: "success" });
    } catch (error) {
      setNotification({ message: "Erro ao eliminar review.", type: "error" });
    }
  };

  const filteredReviews = reviews.filter((review) => {
    if (filterType === "quarto") {
      return review.quarto._id.includes(searchQuery);
    }
    if (filterType === "utilizador") {
      return review.utilizador._id.includes(searchQuery);
    }
    if (filterType === "id") {
      return review._id.includes(searchQuery);
    }
    return true;
  });

  return (
    <div>
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "" })} />

      <h2>Gestão de Reviews</h2>

      {/* Campo de pesquisa */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">Todas</option>
          <option value="id">Por ID da Review</option>
          <option value="quarto">Por ID do Quarto</option>
          <option value="utilizador">Por ID do Utilizador</option>
        </select>
        <input
          type="text"
          placeholder="Pesquisar..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <h3>Lista de Reviews</h3>
      <table>
        <thead>
          <tr>
            <th>Utilizador</th>
            <th>Quarto</th>
            <th>Classificação</th>
            <th>Comentário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredReviews.map((review) => (
            <tr key={review._id}>
              <td>{review.utilizador.nome}</td>
              <td>{review.quarto.nome}</td>
              <td>{review.classificacao}⭐</td>
              <td>{review.comentario}</td>
              <td>
                <button onClick={() => handleDeleteReview(review._id)} style={{ backgroundColor: "red", color: "white" }}>
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

export default AdminReviews;
