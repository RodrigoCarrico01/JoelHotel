const Reservation = require("../models/Reservation");
const Room = require("../models/Room");

// **Criar uma nova reserva**
const createReservation = async (req, res) => {
    try {
        const { quarto, dataCheckIn, dataCheckOut } = req.body;

        // Verificar se o quarto existe
        const existingRoom = await Room.findById(quarto);
        if (!existingRoom) {
            return res.status(404).json({ message: "Quarto não encontrado." });
        }

        // Criar a reserva  
        const reservation = new Reservation({
            utilizador: req.user._id,
            quarto,
            dataCheckIn,
            dataCheckOut,
            pago: false,
            status: "pendente",
        });

        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar reserva.", error });
    }
};

// **Obter todas as reservas do utilizador autenticado**
const getUserReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ utilizador: req.user._id }).populate("quarto");
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar reservas.", error });
    }
};

// **Obter uma reserva específica**
const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate("quarto");
        if (!reservation) {
            return res.status(404).json({ message: "Reserva não encontrada." });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter reserva.", error });
    }
};


// **Eliminar uma reserva**
const deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: "Reserva não encontrada." });
        }

        // Apenas o utilizador dono da reserva ou um admin pode eliminá-la
        if (reservation.utilizador.toString() !== req.user._id.toString() && req.user.role !== "admin") {
            return res.status(403).json({ message: "Não autorizado." });
        }

        await reservation.deleteOne();
        res.json({ message: "Reserva eliminada com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao eliminar reserva.", error });
    }
};

module.exports = { createReservation, getUserReservations, getReservationById, deleteReservation };
