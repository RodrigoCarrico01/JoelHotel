import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import MyReservations from "./pages/MyReservations";
import RequireAuth from "./middleware/RequireAuth";
import Navbar from "./components/Navbar";
import AdminRooms from "./pages/Admin/AdminRooms";  // Nova rota para gestão de quartos admin
import AdminUsers from "./pages/Admin/AdminUsers";  // Nova rota para gestão de utilizadores admin
import AdminReservations from "./pages/Admin/AdminReservations";  // Nova rota para gestão de reservas admin
import AdminReviews from "./pages/Admin/AdminReviews";  // Nova rota para gestão de utilizadores admin
import AdminDashboard from "./pages/Admin/AdminDashboard"; // Importando a página do Dashboard Admin

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />

        {/* Rotas protegidas */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-reservations" element={<MyReservations />} />
          <Route element={<RequireAuth />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/rooms" element={<AdminRooms />} />
            <Route path="/admin/reservations" element={<AdminReservations />} />
            <Route path="/admin/reviews" element={<AdminReviews />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
