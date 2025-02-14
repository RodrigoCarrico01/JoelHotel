const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

// Configurações iniciais
dotenv.config();
connectDB();
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Rota inicial de teste
app.get("/", (req, res) => {
    res.send("API do JoelHotel está a funcionar!");
});

// Porta do servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor aberto na porta ${PORT}`);
});
