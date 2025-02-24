import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Verificar se o token existe e decodificar corretamente
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-color4 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-color6 text-xl font-bold">JoelHotel</Link>
        
        <ul className="flex gap-4">
          <li><Link to="/" className="text-color6 hover:text-color">Home</Link></li>
          <li><Link to="/rooms" className="text-color6 hover:text-color3">Quartos</Link></li>
          
          {!token ? (
            <>
              <li><Link to="/login" className="text-color6 hover:text-color3">Login</Link></li>
              <li><Link to="/register" className="text-color6 hover:text-color3">Registar</Link></li>
            </>
          ) : (
            <>
              {user?.role === "admin" && <li><Link to="/admin" className="text-color6 hover:text-color3">Dashboard</Link></li>}
              <li><Link to="/profile" className="text-color6 hover:text-color3">Meu Perfil</Link></li>
              <li><Link to="/my-reservations" className="text-color6 hover:text-color3">Minhas Reservas</Link></li>
              <li>
                <button 
                  onClick={handleLogout} 
                  className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
