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
        setUserReview({ ...userReview, classificacao: rating, comentario: comment });
        setEditing(false);
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/reviews",
          { quarto: id, classificacao: rating, comentario: comment },
          { headers: { Authorization: `Bearer ${token}` } }
        );

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

  if (loading) return <p className="text-center text-lg text-gray-600">A carregar detalhes do quarto...</p>;

  return (
    <div className="container mx-auto p-6">
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "" })} />

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img src={room?.imagem} alt={room?.nome} className="w-full h-80 object-cover" />
        <div className="p-6">
          <h2 className="text-3xl font-bold text-color4">{room?.nome}</h2>
          <p className="text-gray-600"><strong>Número do Quarto:</strong> {room?.numeroQuarto}</p>
          <p className="text-gray-600"><strong>Preço por Noite:</strong> {room?.precoPorNoite}€</p>
          <p className="mt-4">{room?.descricao}</p>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-semibold text-color4 mb-4">Avaliações</h3>

        {userReview && (
          <div className="bg-gray-100 p-4 rounded-lg mb-4 flex items-center">
            <img src={userReview.utilizador.profilePic} alt="Foto de perfil" className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="font-semibold">A tua Avaliação - {userReview.classificacao}⭐</p>
              <p className="text-gray-600">{userReview.comentario}</p>
              <div className="mt-2 flex space-x-2">
                <button onClick={() => setEditing(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">Editar</button>
                <button onClick={() => {}} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">Eliminar</button>
              </div>
            </div>
          </div>
        )}

        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="bg-gray-100 p-4 rounded-lg flex items-center">
                <img src={review.utilizador.profilePic} alt="Foto de perfil" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <p className="font-semibold">{review.utilizador.nome} - {review.classificacao}⭐</p>
                  <p className="text-gray-600">{review.comentario}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">Ainda não há avaliações para este quarto.</p>
        )}

        {!userReview || editing ? (
          <form onSubmit={handleAddOrUpdateReview} className="mt-6 bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-bold text-color4">{editing ? "Editar Avaliação" : "Deixa a tua Avaliação"}</h3>
            <label className="block mt-4">Classificação:</label>
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))} className="border p-2 rounded-md w-full">
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>{num} ⭐</option>
              ))}
            </select>

            <label className="block mt-4">Comentário:</label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} required className="border p-2 rounded-md w-full"></textarea>

            <button type="submit" className="mt-4 bg-color4 text-white px-4 py-2 rounded-md hover:bg-color3 transition w-full">
              {editing ? "Atualizar Avaliação" : "Enviar Avaliação"}
            </button>
          </form>
        ) : (
          <p className="text-gray-600">Já deixaste uma avaliação para este quarto.</p>
        )}
      </div>
    </div>
  );
}

export default RoomDetails;
