const express = require("express");
const { createReview, getReviewsByRoom, updateReview, deleteReview } = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createReview);
router.get("/:quartoId", getReviewsByRoom);
router.put("/:id", authMiddleware, updateReview); 
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;
