const Reservation = require("../models/Reservation");

const createReservation = async (req, res) => {
    try {
        const { checkInDate, checkOutDate, roomNumber } = req.body;

        const reservation = new Reservation({
            user: req.user.id,
            checkInDate,
            checkOutDate,
            roomNumber,
        });

        await reservation.save();
        res.status(201).json(reservation);
    } catch (error) {
        res.status(500).json({ message: "Erro ao criar reserva", error });
    }
};

const getReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user.id });
        res.json(reservations);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar reservas", error });
    }
};

const updateReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ message: "Reserva não encontrada" });

        if (reservation.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Não autorizado" });
        }

        const updatedReservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedReservation);
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar reserva", error });
    }
};

const deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) return res.status(404).json({ message: "Reserva não encontrada" });

        if (reservation.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Não autorizado" });
        }

        await reservation.deleteOne();
        res.json({ message: "Reserva eliminada com sucesso" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir reserva", error });
    }
};

module.exports = { createReservation, getReservations, updateReservation, deleteReservation };
