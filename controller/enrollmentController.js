const express = require("express");
const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

const createEnrollment = async (req, res) => {
  const { courseId } = req.body;
  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });
  const existing = await Enrollment.findOne({
    studentId: req.user._id,
    courseId,
  });
  if (existing) return res.status(400).json({ message: "Already enrolled" });
  const enroll = await Enrollment.create({
    studentId: req.user._id,
    courseId,
  });
  res.json(enroll);
};
const getMyEnrollments = async (req, res) => {
  const list = await Enrollment.find({ studentId: req.user._id }).populate(
    "courseId"
  );
  res.json(list);
};
const getEnrolledCourses = async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });
  if (!course.instructorId.equals(req.user._id))
    return res.status(403).json({ message: "Forbidden" });
  const students = await Enrollment.find({ courseId: course._id }).populate(
    "studentId",
    "name email"
  );
  res.json(students);
};
module.exports = {
  createEnrollment,
  getMyEnrollments,
  getEnrolledCourses,
};
