const express = require("express");
const { createRoom, getRooms, getRoomById, updateRoom, deleteRoom } = require("../controllers/roomController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.get("/", getRooms);
router.get("/:id", getRoomById);

//admin
router.post("/", authMiddleware, adminMiddleware, createRoom); 
router.put("/:id", authMiddleware, adminMiddleware, updateRoom); 
router.delete("/:id", authMiddleware, adminMiddleware, deleteRoom); 

module.exports = router;
