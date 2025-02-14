const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
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
        dataCheckIn: {
            type: Date,
            required: [true, "A data de check-in é obrigatória"],
        },
        dataCheckOut: {
            type: Date,
            required: [true, "A data de check-out é obrigatória"],
        },
        pago: {
            type: Boolean,
            default: false, // Por padrão, a reserva não está paga
        },
        status: {
            type: String,
            enum: ["pendente", "confirmada", "cancelada"],
            default: "pendente",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Reservation", ReservationSchema);
