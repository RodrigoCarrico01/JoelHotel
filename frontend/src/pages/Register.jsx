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
    <div>
      <Notification message={notification.message} type={notification.type} onClose={() => setNotification({ message: "", type: "" })} />

      <h2>Registar Conta</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Registar</button>
      </form>
    </div>
  );
}

export default Register;
