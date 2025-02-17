const express = require("express");
const { createRoom, updateRoom, deleteRoom } = require("../../controllers/Admin/roomController");
const authMiddleware = require("../../middleware/authMiddleware");
const adminMiddleware = require("../../middleware/adminMiddleware");

const router = express.Router();

router.post("/", authMiddleware, adminMiddleware, createRoom);
router.put("/:id", authMiddleware, adminMiddleware, updateRoom);
router.delete("/:id", authMiddleware, adminMiddleware, deleteRoom);

module.exports = router;
