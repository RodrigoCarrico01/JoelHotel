const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        utilizador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Referência ao modelo de utilizadores
            required: true,
        },
        quarto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Room", // Referência ao modelo de quartos
            required: true,
        },
        classificacao: {
            type: Number,
            required: [true, "A classificação é obrigatória"],
            min: 1,
            max: 5,
        },
        comentario: {
            type: String,
            required: [true, "O comentário é obrigatório"],
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
