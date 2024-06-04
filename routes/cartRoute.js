const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { addCartItem, getCartItem, increaseQuantity, decreaseQuantity, deleteCartItem } = require("../controller/cartCtrl");
const router = express.Router();

router.post("/", authMiddleware, addCartItem);
router.get("/", authMiddleware, getCartItem);
router.put("/increase-quantity", authMiddleware, increaseQuantity);
router.put("/decrease-quantity", authMiddleware, decreaseQuantity);
router.delete("/:productId", authMiddleware, deleteCartItem);

module.exports = router;
