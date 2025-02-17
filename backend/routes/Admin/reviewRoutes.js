const express = require("express");
const { getAllReviews, getReviewsByRoom, getReviewsByUser, getReviewById, deleteReviewAdmin } = require("../../controllers/Admin/reviewController");
const authMiddleware = require("../../middleware/authMiddleware");
const adminMiddleware = require("../../middleware/adminMiddleware");

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getAllReviews); // Listar todas as reviews
router.get("/room/:quartoId", authMiddleware, adminMiddleware, getReviewsByRoom); // Reviews por quarto
router.get("/user/:userId", authMiddleware, adminMiddleware, getReviewsByUser); // Reviews por utilizador
router.get("/:id", authMiddleware, adminMiddleware, getReviewById); // Obter review por ID
router.delete("/:id", authMiddleware, adminMiddleware, deleteReviewAdmin); // Apagar review

module.exports = router;
