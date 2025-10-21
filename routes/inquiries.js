const express = require("express");
const router = express.Router();
const { protect, authorizeRoles } = require("../middleware/auth");
const {
  createInquiry,
  getInquiries,
  deleteInquiry,
} = require("../controller/inquiries");

router.post("/", createInquiry);

router.get("/", protect, authorizeRoles, getInquiries);

router.delete("/:id", protect, authorizeRoles, deleteInquiry);

module.exports = router;
