const Reservation = require("../../models/Reservation");

const getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate("utilizador", "nome email").populate("quarto");
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Erro ao listar reservas.", error });
    }
};

const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate("utilizador", "nome email").populate("quarto");
        if (!reservation) {
            return res.status(404).json({ message: "Reserva não encontrada." });
        }
        res.json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Erro ao obter reserva.", error });
    }
};

const getReservationsByUser = async (req, res) => {
    try {
        const reservations = await Reservation.find({ utilizador: req.params.userId }).populate("quarto");
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar reservas do utilizador.", error });
    }
};

const getReservationsByRoom = async (req, res) => {
    try {
        const reservations = await Reservation.find({ quarto: req.params.quartoId }).populate("utilizador", "nome email");
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar reservas do quarto.", error });
    }
};
const updateReservationAdmin = async (req, res) => {
    try {
        const { status, pago } = req.body;
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: "Reserva não encontrada." });
        }

        reservation.status = status || reservation.status;
        reservation.pago = pago !== undefined ? pago : reservation.pago;

        const updatedReservation = await reservation.save();
        res.json(updatedReservation);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar reserva.", error });
    }
};
const deleteReservationAdmin = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({ message: "Reserva não encontrada." });
        }

        await reservation.deleteOne();
        res.json({ message: "Reserva eliminada com sucesso." });
    } catch (error) {
        res.status(500).json({ message: "Erro ao eliminar reserva.", error });
    }
};

module.exports = { updateReservationAdmin, getAllReservations, getReservationById, getReservationsByUser, getReservationsByRoom, deleteReservationAdmin };
