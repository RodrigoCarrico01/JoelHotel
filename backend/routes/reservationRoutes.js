const express = require("express");
const { createReservation, getUserReservations, getReservationById, updateReservation, deleteReservation } = require("../controllers/reservationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createReservation);
router.get("/", authMiddleware, getUserReservations);
router.get("/:id", authMiddleware, getReservationById);
router.put("/:id", authMiddleware, updateReservation);
router.delete("/:id", authMiddleware, deleteReservation);

module.exports = router;
