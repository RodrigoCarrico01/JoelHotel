import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [message, setMessage] = useState("");
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
        setMessage(error.response?.data?.message || "Erro ao carregar reviews.");
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
      setReviews(reviews.filter((review) => review._id !== id)); // Remove a review da lista
      setMessage("Review eliminada com sucesso!");
    } catch (error) {
      setMessage("Erro ao eliminar review.");
    }
  };

  return (
    <div>
      <h2>Gestão de Reviews</h2>
      {message && <p>{message}</p>}
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
          {reviews.map((review) => (
            <tr key={review._id}>
              <td>{review.utilizador.nome}</td>
              <td>{review.quarto.nome}</td>
              <td>{review.classificacao}⭐</td>
              <td>{review.comentario}</td>
              <td>
                <button onClick={() => navigate(`/admin/reviews/${review._id}`)}>Editar</button>
                <button onClick={() => handleDeleteReview(review._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminReviews;
