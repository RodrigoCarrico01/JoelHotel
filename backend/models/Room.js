const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "O nome do quarto é obrigatório"],
        },
        description: {
            type: String,
            required: [true, "A descrição do quarto é obrigatória"],
        },
        image: {
            type: String, // Pode ser uma URL para a imagem do quarto
            required: [true, "A imagem do quarto é obrigatória"],
        },
        roomNumber: {
            type: String,
            required: [true, "O número do quarto é obrigatório"],
            unique: true,
        },
        pricePerNight: {
            type: Number,
            required: [true, "O preço por noite é obrigatório"],
        },
        status: {
            type: String,
            enum: ["disponível", "ocupado"],
            default: "disponível",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
