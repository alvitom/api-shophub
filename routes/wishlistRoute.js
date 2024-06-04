const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { getWishlist, addWishlist, deleteWishlist } = require("../controller/wishlistCtrl");
const router = express.Router();

router.post("/", authMiddleware, addWishlist);
router.get("/", authMiddleware, getWishlist);
router.delete("/:productId", authMiddleware, deleteWishlist);

module.exports = router;
