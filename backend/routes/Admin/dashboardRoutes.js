const express = require("express");
const adminDashboardController = require("../../controllers/Admin/dashboardController");
const authMiddleware = require("../../middleware/authMiddleware");
const adminMiddleware = require("../../middleware/adminMiddleware");

const router = express.Router();

// Rota protegida para o painel de administração
router.get("/", authMiddleware, adminMiddleware, adminDashboardController);

module.exports = router;
