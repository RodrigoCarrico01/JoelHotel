import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Notification from "../components/Notification";

function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userReview, setUserReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [editing, setEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
        setRoom(response.data);
      } catch (err) {
        setNotification({ message: "Erro ao carregar detalhes do quarto.", type: "error" });
      } finally {
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/${id}`);
        const allReviews = response.data;

        const userOwnReview = allReviews.find((review) => review.utilizador._id === userId);
        setUserReview(userOwnReview);
        setReviews(allReviews.filter((review) => review.utilizador._id !== userId));
      } catch (err) {
        setNotification({ message: "Erro ao carregar reviews.", type: "error" });
      }
    };

    fetchRoom();
    fetchReviews();
  }, [id, userId]);

  const handleAddOrUpdateReview = async (e) => {
    e.preventDefault();
    setNotification({ message: "", type: "" });
  
    if (!token) {
      setNotification({ message: "Precisas de estar autenticado para deixar uma avaliação.", type: "error" });
      return;
    }
  
    try {
      if (userReview) {
        await axios.put(
          `http://localhost:5000/api/reviews/${userReview._id}`,
          { classificacao: rating, comentario: comment },
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        setNotification({ message: "Avaliação atualizada com sucesso!", type: "success" });
        setUserReview({
          ...userReview,
          classificacao: rating,
          comentario: comment,
        });
        setEditing(false);
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/reviews",
          { quarto: id, classificacao: rating, comentario: comment },
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        // Buscar os dados do utilizador autenticado e adicionar à review
        const userResponse = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const newReview = {
          ...response.data,
          utilizador: {
            _id: userResponse.data._id,
            nome: userResponse.data.nome,
            profilePic: userResponse.data.profilePic || "https://via.placeholder.com/50",
          },
        };
  
        setUserReview(newReview);
        setNotification({ message: "Avaliação adicionada com sucesso!", type: "success" });
      }
    } catch (err) {
      setNotification({ message: "Erro ao adicionar ou atualizar avaliação.", type: "error" });
    }
  };
  

  const handleDeleteReview = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/reviews/${userReview._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUserReview(null);
      setNotification({ message: "Avaliação eliminada com sucesso!", type: "success" });
    } catch (err) {
      setNotification({ message: "Erro ao eliminar avaliação.", type: "error" });
    }
  };

  // Paginação
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <p>A carregar detalhes do quarto...</p>;

  return (
    <div>
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "" })} />

      <h2>{room?.nome}</h2>
      <img src={room?.imagem} alt={room?.nome} style={{ width: "100%", height: "400px", objectFit: "cover" }} />
      <p><strong>Número do Quarto:</strong> {room?.numeroQuarto}</p>
      <p><strong>Preço por Noite:</strong> {room?.precoPorNoite}€</p>
      <p>{room?.descricao}</p>

      <h3>Avaliações</h3>

      {userReview && (
        <div style={{ borderBottom: "1px solid #ddd", padding: "10px 0", display: "flex", alignItems: "center" }}>
          <img 
            src={userReview.utilizador.profilePic || "https://via.placeholder.com/50"} 
            alt="Foto de perfil" 
            style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }} 
          />
          <div>
            <p><strong>A tua Avaliação</strong> - {userReview.classificacao}⭐</p>
            <p>{userReview.comentario}</p>
            <button onClick={() => setEditing(true)}>Editar</button>
            <button onClick={handleDeleteReview} style={{ backgroundColor: "red", color: "white" }}>
              Eliminar
            </button>
          </div>
        </div>
      )}

      {reviews.length > 0 && (
        <>
          <ul>
            {currentReviews.map((review) => (
              <li key={review._id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0", display: "flex", alignItems: "center" }}>
                <img 
                  src={review.utilizador.profilePic || "https://via.placeholder.com/50"} 
                  alt="Foto de perfil" 
                  style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px" }} 
                />
                <div>
                  <p><strong>{review.utilizador.nome}</strong> - {review.classificacao}⭐</p>
                  <p>{review.comentario}</p>
                </div>
              </li>
            ))}
          </ul>

          {reviews.length > reviewsPerPage && (
            <div>
              <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
              <span> Página {currentPage} de {totalPages} </span>
              <button onClick={nextPage} disabled={currentPage === totalPages}>Próxima</button>
            </div>
          )}
        </>
      )}

      {!userReview || editing ? (
        <div>
          <h3>{editing ? "Editar Avaliação" : "Deixa a tua Avaliação"}</h3>
          <form onSubmit={handleAddOrUpdateReview}>
            <label>Classificação:</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num} ⭐</option>
              ))}
            </select>

            <label>Comentário:</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />

            <button type="submit">{editing ? "Atualizar Avaliação" : "Enviar Avaliação"}</button>
          </form>
        </div>
      ) : (
        <p>Já deixaste uma avaliação para este quarto.</p>
      )}
    </div>
  );
}

export default RoomDetails;
