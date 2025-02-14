const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Room = require("../models/Room");

dotenv.config();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" Conectado ao MongoDB"))
    .catch((err) => console.error(" Erro ao conectar ao MongoDB:", err));

const testRoomModel = async () => {
    try {
        // Criar um quarto de teste
        const room = new Room({
            nome: "Suite Luxo",
            descricao: "Quarto espaçoso com vista para o mar.",
            imagem: "https://example.com/suite-luxo.jpg",
            numeroQuarto: "101",
            precoPorNoite: 150,
            status: "disponível",
        });

        await room.save();
        console.log(" Quarto criado com sucesso:", room);
    } catch (error) {
        console.error(" Erro ao testar o modelo de quarto:", error);
    } finally {
        mongoose.connection.close(); // Fecha a conexão após o teste
    }
};

// Executar o teste
testRoomModel();
