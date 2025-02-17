const express = require("express");
const { getAllUsers, getUserById, deleteUserById } = require("../../controllers/Admin/userController");
const authMiddleware = require("../../middleware/authMiddleware");
const adminMiddleware = require("../../middleware/adminMiddleware");

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getAllUsers);
router.get("/:id", authMiddleware, adminMiddleware, getUserById);
router.delete("/:id", authMiddleware, adminMiddleware, deleteUserById);

module.exports = router;
