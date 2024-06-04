const express = require("express");
const { createBlog, updateBlog, getBlog, getAllBlog, deleteBlog, likeBlog, dislikeBlog, uploadImages } = require("../controller/blogCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { uploadImage, blogImgResize } = require("../middlewares/uploadImage");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBlog);
router.get("/", getAllBlog);
router.get("/:id", getBlog);
router.put("/likes", authMiddleware, likeBlog);
router.put("/dislikes", authMiddleware, dislikeBlog);
router.put("/:id", authMiddleware, isAdmin, updateBlog);
router.put("/upload/:id", authMiddleware, isAdmin, uploadImage.array("images", 4), blogImgResize, uploadImages);
router.delete("/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;
