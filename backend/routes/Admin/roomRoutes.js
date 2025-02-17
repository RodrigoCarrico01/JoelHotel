const express = require("express");
const { createRoom, updateRoom, deleteRoom, getAllRooms, getRoomByIdAdmin } = require("../../controllers/Admin/roomController");
const authMiddleware = require("../../middleware/authMiddleware");
const adminMiddleware = require("../../middleware/adminMiddleware");

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getAllRooms); 
router.get("/:id", authMiddleware, adminMiddleware, getRoomByIdAdmin); 
router.post("/", authMiddleware, adminMiddleware, createRoom);
router.put("/:id", authMiddleware, adminMiddleware, updateRoom);
router.delete("/:id", authMiddleware, adminMiddleware, deleteRoom);

module.exports = router;
