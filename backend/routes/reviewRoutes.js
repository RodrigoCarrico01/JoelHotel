const express = require("express");
const { createReview, getReviewsByRoom, deleteReview } = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createReview);
router.get("/:quartoId", getReviewsByRoom);
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;
