const Reservation = require("../models/Reservation");

const checkAvailabilityMiddleware = async (req, res, next) => {
    try {
        const { quarto, dataCheckIn, dataCheckOut } = req.body;

        // Verificar se há reservas já pagas e confirmadas para o mesmo quarto e datas
        const existingReservations = await Reservation.find({
            quarto,
            pago: true,
            status: "confirmada",
            $or: [
                { dataCheckIn: { $lte: dataCheckOut }, dataCheckOut: { $gte: dataCheckIn } }, // Se houver sobreposição
            ],
        });

        if (existingReservations.length > 0) {
            return res.status(400).json({ message: "Este quarto já está reservado para essas datas." });
        }

        next(); // Se não houver conflito, continua para criar a reserva
    } catch (error) {
        res.status(500).json({ message: "Erro ao verificar disponibilidade.", error });
    }
};

module.exports = checkAvailabilityMiddleware;
