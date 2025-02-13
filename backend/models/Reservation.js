const mongoose = require("mongoose");

const ReservationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        checkInDate: {
            type: Date,
            required: [true, "A data de check-in é obrigatória"],
        },
        checkOutDate: {
            type: Date,
            required: [true, "A data de check-out é obrigatória"],
        },
        roomNumber: {
            type: String,
            required: [true, "O número do quarto é obrigatório"],
        },
        isPaid: {
            type: Boolean,
            default: false,
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


// 📌 Explicação:
// user: Referência ao ID do utilizador que fez a reserva.
// checkInDate e checkOutDate: Datas obrigatórias da reserva.
// roomNumber: Número do quarto reservado.
// isPaid: Indica se a reserva foi paga (false por padrão).
// status: Pode ser "pendente", "confirmada" ou "cancelada".
