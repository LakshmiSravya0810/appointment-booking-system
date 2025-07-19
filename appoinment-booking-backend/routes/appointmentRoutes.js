const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments
} = require("../controllers/appointmentController");

// Create a new appointment
router.post("/", createAppointment);

// Get all appointments
router.get("/", getAppointments);

module.exports = router;
