import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../components/Notification";

function Profile() {
  const [user, setUser] = useState(null);
  const [nome, setNome] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
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
        setNotification({ message: "Erro ao carregar perfil.", type: "error" });
      }
    };

    fetchProfile();
  }, [token]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setNotification({ message: "", type: "" });

    if (!currentPassword) {
      setNotification({ message: "A palavra-passe atual é obrigatória.", type: "error" });
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        { nome, profilePic, newPassword, currentPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(response.data);
      setNotification({ message: "Perfil atualizado com sucesso!", type: "success" });
      setNewPassword("");
      setCurrentPassword("");
    } catch (error) {
      setNotification({ message: error.response?.data?.message || "Erro ao atualizar perfil.", type: "error" });
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      setNotification({ message: "Por favor, insere a palavra-passe.", type: "error" });
      return;
    }

    try {
      await axios.delete("http://localhost:5000/api/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
        data: { password: deletePassword },
      });

      localStorage.removeItem("token");
      navigate("/register");
    } catch (error) {
      setNotification({ message: error.response?.data?.message || "Erro ao eliminar conta.", type: "error" });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "" })} />

      <h2>Meu Perfil</h2>
      <img src={profilePic} alt="Foto de Perfil" width="150" />

      <form onSubmit={handleUpdateProfile}>
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <input type="password" placeholder="Palavra-passe atual" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
        <input type="password" placeholder="Nova Palavra-Passe (opcional)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <button type="submit">Atualizar Perfil</button>
      </form>

      <h3>Eliminar Conta</h3>
      <input type="password" placeholder="Confirme a palavra-passe" value={deletePassword} onChange={(e) => setDeletePassword(e.target.value)} />
      <button onClick={handleDeleteAccount} style={{ backgroundColor: "red", color: "white" }}>Eliminar Conta</button>
    </div>
  );
}

export default Profile;
