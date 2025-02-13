const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);

app.get("/", (req, res) => {
    res.send("API do JoelHotel está a funcionar!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor aberto na porta ${PORT}`);
});
