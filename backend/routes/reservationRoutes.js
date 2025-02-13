const express = require("express");
const { createReservation, getReservations, updateReservation, deleteReservation } = require("../controllers/reservationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createReservation);
router.get("/", authMiddleware, getReservations);
router.put("/:id", authMiddleware, updateReservation);
router.delete("/:id", authMiddleware, deleteReservation);

module.exports = router;
