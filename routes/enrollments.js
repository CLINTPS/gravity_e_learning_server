const express = require("express");
const { protect, authorizeRoles} = require("../middleware/auth");
const {
  createEnrollment,
  getMyEnrollments,
  getEnrolledCourses,
} = require("../controller/enrollmentController");

const router = express.Router();

router.post(
  "/enroll",
  protect,
  authorizeRoles("student"),
  createEnrollment
);

router.get(
  "/me",
  protect,
  authorizeRoles("student"),
  getMyEnrollments
);

router.get(
  "/course/:courseId/students",
  protect,
  authorizeRoles("instructor"),
  getEnrolledCourses
);

module.exports = router;
