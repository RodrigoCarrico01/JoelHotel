const express = require("express");
const { updateReservationAdmin, getAllReservations, getReservationById, getReservationsByUser, getReservationsByRoom, deleteReservationAdmin } = require("../../controllers/Admin/reservationController");
const authMiddleware = require("../../middleware/authMiddleware");
const adminMiddleware = require("../../middleware/adminMiddleware");

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getAllReservations); // Listar todas as reservas
router.get("/:id", authMiddleware, adminMiddleware, getReservationById); // Obter reserva por ID
router.get("/user/:userId", authMiddleware, adminMiddleware, getReservationsByUser); // Reservas por utilizador
router.get("/room/:quartoId", authMiddleware, adminMiddleware, getReservationsByRoom); // Reservas por quarto
router.put("/:id", authMiddleware, adminMiddleware, updateReservationAdmin); // Atualizar reserva
router.delete("/:id", authMiddleware, adminMiddleware, deleteReservationAdmin); // Eliminar reserva

module.exports = router;
