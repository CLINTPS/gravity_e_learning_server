const express = require("express");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (
      req.user.role !== "admin" &&
      course.instructorId.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await course.deleteOne();
    res.json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
};

const createCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const already = await Enrollment.findOne({
      studentId: req.user.id,
      courseId: course._id,
    });
    if (already) return res.status(400).json({ message: "Already enrolled" });

    const enrollment = await Enrollment.create({
      studentId: req.user.id,
      courseId: course._id,
      enrolledAt: new Date(),
    });

    res.status(201).json({ message: "Enrollment successful", enrollment });
  } catch (error) {
    res.status(500).json({ message: "Error enrolling", error });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    if (course.instructorId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const enrollments = await Enrollment.find({
      courseId: course._id,
    }).populate("studentId", "name email");

    res.json(enrollments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching enrolled students", error });
  }
};
module.exports = {
  deleteCourse,
  createCourse,
  getCourse,
};
