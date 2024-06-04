const express = require("express");
const { createProduct, getAProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating, uploadImages, deleteImages } = require("../controller/productCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadImage, productImgResize } = require("../middlewares/uploadImage");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);
router.get("/", getAllProduct);
router.get("/:id", getAProduct);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.put("/upload-img/:id", authMiddleware, isAdmin, uploadImage.array("images", 15), productImgResize, uploadImages);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.delete("/delete-img/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
