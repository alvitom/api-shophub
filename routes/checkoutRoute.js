const express = require("express");
const { addCheckoutItem, getCheckoutItem, applyCoupon } = require("../controller/checkoutCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, addCheckoutItem);
router.post("/apply-coupon", authMiddleware, applyCoupon);
router.get("/", authMiddleware, getCheckoutItem);

module.exports = router;
