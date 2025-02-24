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
    <div className="container mx-auto p-6">
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "" })} />

      <h2 className="text-3xl font-bold text-color4 text-center mb-6">Gestão de Reviews</h2>

      {/* Campo de pesquisa */}
      <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
        <select 
          value={filterType} 
          onChange={(e) => setFilterType(e.target.value)} 
          className="p-2 border rounded-md w-full md:w-1/4"
        >
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
          className="p-2 border rounded-md w-full md:w-1/2"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Utilizador</th>
              <th className="border border-gray-300 p-2">Quarto</th>
              <th className="border border-gray-300 p-2">Classificação</th>
              <th className="border border-gray-300 p-2">Comentário</th>
              <th className="border border-gray-300 p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredReviews.map((review) => (
              <tr key={review._id} className="text-center">
                <td className="border border-gray-300 p-2">{review.utilizador.nome}</td>
                <td className="border border-gray-300 p-2">{review.quarto.nome}</td>
                <td className="border border-gray-300 p-2">{review.classificacao}⭐</td>
                <td className="border border-gray-300 p-2">{review.comentario}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminReviews;
