import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../components/Notification";

function Profile() {
  const [user, setUser] = useState(null);
  const [nome, setNome] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [tempProfilePic, setTempProfilePic] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [changeType, setChangeType] = useState(""); // 'nome' ou 'foto'
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

  const handleUpdateProfile = async () => {
    if (!currentPassword) {
      setNotification({ message: "A palavra-passe atual é obrigatória.", type: "error" });
      return;
    }

    try {
      const updatedData = { currentPassword };
      if (changeType === "nome") updatedData.nome = nome;
      if (changeType === "foto") updatedData.profilePic = tempProfilePic;

      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(response.data);
      setProfilePic(response.data.profilePic);
      setNotification({ message: "Perfil atualizado com sucesso!", type: "success" });
      setCurrentPassword("");
      setShowPasswordModal(false);
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
        setTempProfilePic(reader.result);
        setChangeType("foto");
        setShowPasswordModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNameChange = (e) => {
    setNome(e.target.value);
  };

  const handleNameKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setChangeType("nome");
      setShowPasswordModal(true);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-color1">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "" })} />
        
        <h2 className="text-2xl font-bold text-color4 mb-4 text-center">Meu Perfil</h2>
        
        <div className="flex flex-col items-center">
          <img src={profilePic} alt="Foto de Perfil" className="w-24 h-24 rounded-full border-2 border-color4 mb-4" />
          
          <input 
            type="text" 
            placeholder="Nome" 
            value={nome} 
            onChange={handleNameChange} 
            onKeyDown={handleNameKeyPress} 
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-color3 w-full"
          />
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            className="border p-2 rounded-md focus:outline-none w-full"
          />
        </div>

        <button 
          onClick={() => setShowDeleteModal(true)} 
          className="bg-red-500 text-white p-2 rounded-md w-full hover:bg-red-600 transition mt-6"
        >
          Eliminar Conta
        </button>
      </div>

      {/* Modal para confirmar senha */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold text-color4">Confirme com a Palavra-Passe</h3>
            <p className="text-sm text-gray-600">Esta alteração requer a confirmação da tua palavra-passe.</p>
            <input 
              type="password" 
              placeholder="Palavra-passe atual" 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
              required 
              className="border p-2 rounded-md focus:ring-2 focus:ring-color3 w-full mt-2"
            />
            <div className="flex justify-between mt-4">
              <button onClick={() => setShowPasswordModal(false)} className="text-gray-500">Cancelar</button>
              <button onClick={handleUpdateProfile} className="bg-color4 text-white px-4 py-2 rounded-md hover:bg-color3 transition">Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para confirmar eliminação da conta */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-bold text-red-600">Confirmar Eliminação</h3>
            <input 
              type="password" 
              placeholder="Confirme a palavra-passe" 
              value={deletePassword} 
              onChange={(e) => setDeletePassword(e.target.value)} 
              className="border p-2 rounded-md focus:ring-2 focus:ring-red-400 w-full mt-2"
            />
            <div className="flex justify-between mt-4">
              <button onClick={() => setShowDeleteModal(false)} className="text-gray-500">Cancelar</button>
              <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">Eliminar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
