const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log(" Conectado ao MongoDB"))
    .catch((err) => console.error(" Erro ao conectar ao MongoDB:", err));

const testUserModel = async () => {
    try {
        // Criar um utilizador de teste
        const user = new User({
            nome: "Rodrigo Martins",
            email: "rodrigo@gmail.com",
            password: "123456",
            role: "utilizador",
            profilePic: "https://example.com/rodrigo-profile.png",
        });

        await user.save();
        console.log(" Utilizador criado com sucesso:", user);

    } catch (error) {
        console.error(" Erro ao testar o modelo de utilizador:", error);
    } finally {
        mongoose.connection.close(); // Fecha a conexão após o teste
    }
};

// Executar o teste
testUserModel();
