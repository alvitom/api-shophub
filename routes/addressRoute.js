const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { addAddressUser, getAddressUser, updateAddressUser } = require("../controller/addressCtrl");
const router = express.Router();

router.post("/", authMiddleware, addAddressUser);
router.get("/", authMiddleware, getAddressUser);
router.put("/:addressId", authMiddleware, updateAddressUser);

module.exports = router;
