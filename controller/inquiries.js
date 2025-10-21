const express = require("express");
const router = express.Router();
const Inquiry = require("../models/Inquiry");
const { protect, authorizeRoles } = require("../middleware/auth");

const createInquiry = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message)
      return res.status(400).json({ message: "All fields are required" });

    const inquiry = await Inquiry.create({ name, email, message });
    res
      .status(201)
      .json({ message: "Inquiry submitted successfully", inquiry });
  } catch (error) {
    res.status(500).json({ message: "Error submitting inquiry", error });
  }
};

const getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inquiries", error });
  }
};

const deleteInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id);
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });

    await inquiry.deleteOne();
    res.json({ message: "Inquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting inquiry", error });
  }
};

module.exports = {
  createInquiry,
  getInquiries,
  deleteInquiry,
};
