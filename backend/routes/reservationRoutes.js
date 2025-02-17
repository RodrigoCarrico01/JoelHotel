const express = require("express");
const { createReservation, getUserReservations, getReservationById, deleteReservation } = require("../controllers/reservationController");
const authMiddleware = require("../middleware/authMiddleware");
const checkAvailabilityMiddleware = require("../middleware/checkAvailabilityMiddleware");

const router = express.Router();

router.post("/", authMiddleware, checkAvailabilityMiddleware, createReservation);
router.get("/", authMiddleware, getUserReservations);
router.get("/:id", authMiddleware, getReservationById);
router.delete("/:id", authMiddleware, deleteReservation);

module.exports = router;
