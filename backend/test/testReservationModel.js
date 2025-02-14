const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Reservation = require("../models/Reservation");
const User = require("../models/User");
const Room = require("../models/Room");

dotenv.config();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" Conectado ao MongoDB"))
    .catch((err) => console.error(" Erro ao conectar ao MongoDB:", err));

const testReservationModel = async () => {
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

        // Criar uma reserva de teste
        const reserva = new Reservation({
            utilizador: utilizador._id,
            quarto: quarto._id,
            dataCheckIn: new Date("2025-03-01"),
            dataCheckOut: new Date("2025-03-07"),
            pago: false,
            status: "pendente",
        });

        await reserva.save();
        console.log(" Reserva criada com sucesso:", reserva);
    } catch (error) {
        console.error(" Erro ao testar o modelo de reserva:", error);
    } finally {
        mongoose.connection.close(); // Fecha a conexão após o teste
    }
};

// Executar o teste
testReservationModel();
