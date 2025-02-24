import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Notification from "../components/Notification";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setNotification({ message: "", type: "" });

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });

      localStorage.setItem("token", response.data.token);
      setNotification({ message: "Login bem-sucedido! Redirecionando...", type: "success" });

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setNotification({ message: "Credenciais inválidas. Tente novamente.", type: "error" });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-color1">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "" })} />
        
        <h2 className="text-2xl font-bold text-color4 mb-4 text-center">Login no JoelHotel</h2>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
