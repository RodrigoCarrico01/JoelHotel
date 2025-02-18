const express = require("express");
const bodyParser = require("body-parser")
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const adminUserRoutes = require("./routes/Admin/userRoutes");
const adminRoomRoutes = require("./routes/Admin/roomRoutes");
const adminReservationRoutes = require("./routes/Admin/reservationRoutes");
const adminReviewRoutes = require("./routes/Admin/reviewRoutes");

// Configurações iniciais
dotenv.config();
connectDB();
const app = express();

// Definir o limite de tamanho de upload
app.use(bodyParser.json({ limit: "10mb" })); // Ajuste conforme necessário (10mb é só um exemplo)
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Middlewares
app.use(express.json());    
app.use(cors());    
app.use(morgan("dev"));

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/reviews", reviewRoutes);

//Rotas Admin
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/rooms", adminRoomRoutes);
app.use("/api/admin/reservations", adminReservationRoutes);
app.use("/api/admin/reviews", adminReviewRoutes);


// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor aberto na porta ${PORT}`);
});
