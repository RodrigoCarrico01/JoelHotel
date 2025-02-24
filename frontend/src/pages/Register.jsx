import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../components/Notification";

function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setNotification({ message: "", type: "" });

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        nome,
        email,
        password,
      });

      setNotification({ message: "Conta criada com sucesso! Redirecionando...", type: "success" });
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setNotification({ message: "Erro ao criar conta. Tente novamente.", type: "error" });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-color1">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "" })} />
        
        <h2 className="text-2xl font-bold text-color4 mb-4 text-center">Registar no JoelHotel</h2>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Nome" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
            required 
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-color3"
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-color3"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-color3"
          />
          <button 
            type="submit" 
            className="bg-color4 text-white p-2 rounded-md hover:bg-color3 transition"
          >
            Registar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
