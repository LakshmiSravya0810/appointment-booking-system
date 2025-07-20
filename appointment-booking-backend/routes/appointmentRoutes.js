const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments
} = require("../controllers/appointmentController");

// POST /api/appointments → Create appointment
router.post("/", createAppointment);

// GET /api/appointments → Get all appointments
router.get("/", getAppointments);

module.exports = router; // ✅ Make sure this is exported
