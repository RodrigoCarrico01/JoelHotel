import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/rooms">Quartos</Link></li>
        {!token ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Registar</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">Meu Perfil</Link></li>
            <li><Link to="/my-reservations">Minhas Reservas</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
