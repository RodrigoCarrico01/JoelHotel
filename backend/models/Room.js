const mongoose = require("mongoose");
const Reservation = require("./Reservation");
const Review = require("./Review");

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
// **Antes de eliminar um quarto, remove todas as suas reservas e reviews**
RoomSchema.pre("deleteOne", { document: true, query: false }, async function (next) {
    try {
        await Reservation.deleteMany({ quarto: this._id });
        await Review.deleteMany({ quarto: this._id });
        console.log(`✅ Reservas e reviews do quarto ${this._id} eliminadas.`);
        next();
    } catch (error) {
        console.error("❌ Erro ao eliminar reservas e reviews do quarto:", error);
        next(error);
    }
});

module.exports = mongoose.model("Room", RoomSchema);
