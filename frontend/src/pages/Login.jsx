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

      setTimeout(() => navigate("/dashboard"), 2000);
    } catch (err) {
      setNotification({ message: "Credenciais inválidas. Tente novamente.", type: "error" });
    }
  };

  return (
    <div>
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "" })} />

      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
