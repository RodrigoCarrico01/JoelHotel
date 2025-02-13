const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Reservation = require("./models/Reservation");

dotenv.config();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("🔥 Conectado ao MongoDB"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

const testModels = async () => {
    try {
        // Criar um utilizador de teste
        const user = new User({
            name: "Rodrigo Martins",
            email: "rodrigo@email.com",
            password: "123456",
            role: "admin",
        });
        await user.save();
        console.log("✅ Utilizador criado:", user);

        // Criar uma reserva associada ao utilizador
        const reservation = new Reservation({
            user: user._id,
            checkInDate: new Date("2025-03-01"),
            checkOutDate: new Date("2025-03-07"),
            roomNumber: "101",
            isPaid: false,
            status: "pendente",
        });
        await reservation.save();
        console.log("✅ Reserva criada:", reservation);

    } catch (error) {
        console.error("Erro ao testar os modelos:", error);
    } finally {
        mongoose.connection.close(); // Fecha a conexão após o teste
    }
};

// Executar o teste
testModels();
