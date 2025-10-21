const express = require("express");
const { protect, authorizeRoles } = require("../middleware/auth");
const { deleteCourse, createCourse, getCourse } = require("../controller/courseController");

const router = express.Router();

router.delete("/:id", protect, deleteCourse);
router.post(
  "/:id/enroll",
  protect,
  authorizeRoles("student"),
  createCourse
);

router.get(
  "/:id/students",
  protect,
  authorizeRoles("instructor"),
  getCourse
);

module.exports = router;
