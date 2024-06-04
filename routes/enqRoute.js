const express = require("express");
const { createEnquiry, updateEnquiry, deleteEnquiry, getEnquiry, getAllEnquirys } = require("../controller/enqCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", createEnquiry);
router.get("/", getAllEnquirys);
router.get("/:id", getEnquiry);
router.put("/:id", authMiddleware, isAdmin, updateEnquiry);
router.delete("/:id", authMiddleware, isAdmin, deleteEnquiry);

module.exports = router;
