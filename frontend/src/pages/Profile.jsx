import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [nome, setNome] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setNome(response.data.nome);
        setProfilePic(response.data.profilePic || "https://via.placeholder.com/150");
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    fetchProfile();
  }, [token]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!currentPassword) {
      setError("A palavra-passe atual é obrigatória para fazer alterações.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        { nome, profilePic, newPassword, currentPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(response.data);
      setMessage("Perfil atualizado com sucesso!");
      setNewPassword("");
      setCurrentPassword(""); // Limpar campo de palavra-passe
    } catch (error) {
      setError(error.response?.data?.message || "Erro ao atualizar perfil.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setError("Por favor, introduza a sua palavra-passe para confirmar.");
      return;
    }

    try {
      await axios.delete("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
        data: { password: deletePassword },
      });

      localStorage.removeItem("token"); // Remove o token
      navigate("/register"); // Redireciona para a página de registo
    } catch (error) {
      setError(error.response?.data?.message || "Erro ao eliminar conta.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result); // Mostra a imagem carregada
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return <p>A carregar...</p>;

  return (
    <div>
      <h2>Meu Perfil</h2>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <img src={profilePic} alt="Foto de Perfil" width="150" />

      <form onSubmit={handleUpdateProfile}>
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="password"
          placeholder="Palavra-passe atual"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Nova Palavra-Passe (opcional)"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button type="submit">Atualizar Perfil</button>
      </form>

      <h3>Eliminar Conta</h3>
      <input
        type="password"
        placeholder="Confirme a palavra-passe"
        value={deletePassword}
        onChange={(e) => setDeletePassword(e.target.value)}
      />
      <button onClick={handleDeleteAccount} style={{ backgroundColor: "red", color: "white" }}>
        Eliminar Conta
      </button>
    </div>
  );
}

export default Profile;
