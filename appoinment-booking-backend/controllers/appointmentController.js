const Appointment = require("../models/Appointment");

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { name, email, phone, doctor, date, time, reason } = req.body;

    const appointment = new Appointment({
      name,
      email,
      phone,
      doctor,
      date,
      time,
      reason
    });

    const saved = await appointment.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("❌ Error in createAppointment:", error.message);
    res.status(500).json({ message: "Failed to create appointment", error: error.message });
  }
};

// Get all appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find(); // ✅ NO populate here!
    console.log("✅ Sending appointments:", appointments); // Debug log
    res.status(200).json(appointments); // ✅ Must return array
  } catch (error) {
    console.error("❌ Error in getAppointments:", error.message);
    res.status(500).json({ message: "Failed to fetch appointments", error: error.message });
  }
};
