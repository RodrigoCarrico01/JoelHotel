const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: [true, "O nome do quarto é obrigatório"],
        },
        descricao: {
            type: String,
            required: [true, "A descrição do quarto é obrigatória"],
        },
        imagem: {
            type: String, // URL da imagem
            required: [true, "A imagem do quarto é obrigatória"],
        },
        numeroQuarto: {
            type: String,
            required: [true, "O número do quarto é obrigatório"],
            unique: true,
        },
        precoPorNoite: {
            type: Number,
            required: [true, "O preço por noite é obrigatório"],
        },
        status: {
            type: String,
            enum: ["disponível", "ocupado","manutenção"],
            default: "disponível",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
