const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createOrder, getAllOrders, getDetailOrder, updateOrderStatus } = require("../controller/orderCtrl");
const router = express.Router();

router.post("/", authMiddleware, createOrder);
router.get("/", authMiddleware, getAllOrders);
router.get("/:orderId", authMiddleware, getDetailOrder);
router.put("/status/:id", authMiddleware, isAdmin, updateOrderStatus);

module.exports = router;
