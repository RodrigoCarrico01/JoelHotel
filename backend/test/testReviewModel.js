const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Review = require("../models/Review");
const User = require("../models/User");
const Room = require("../models/Room");

dotenv.config();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" Conectado ao MongoDB"))
    .catch((err) => console.error(" Erro ao conectar ao MongoDB:", err));

const testReviewModel = async () => {
    try {
        // Buscar um utilizador e um quarto existente
        let utilizador = await User.findOne();
        if (!utilizador) {
            utilizador = await User.create({
                nome: "Rodrigo Martins",
                email: "rodrigo@gmail.com",
                password: "123456",
                role: "utilizador",
                profilePic: "https://example.com/rodrigo-profile.png",
            });
            console.log(" Utilizador criado:", utilizador);
        }

        let quarto = await Room.findOne();
        if (!quarto) {
            quarto = await Room.create({
                nome: "Suite Luxo",
                descricao: "Quarto espaçoso com vista para o mar.",
                imagem: "https://example.com/suite-luxo.jpg",
                numeroQuarto: "101",
                precoPorNoite: 150,
                status: "disponível",
            });
            console.log(" Quarto criado:", quarto);
        }

        // Criar uma review de teste
        const review = new Review({
            utilizador: utilizador._id,
            quarto: quarto._id,
            classificacao: 5,
            comentario: "Adorei o quarto! Muito confortável e limpo.",
        });

        await review.save();
        console.log(" Review criada com sucesso:", review);
    } catch (error) {
        console.error(" Erro ao testar o modelo de review:", error);
    } finally {
        mongoose.connection.close(); // Fecha a conexão após o teste
    }
};

// Executar o teste
testReviewModel();
