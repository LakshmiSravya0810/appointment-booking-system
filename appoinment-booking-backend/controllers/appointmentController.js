const Appointment = require("../models/Appointment");

exports.createAppointment = async (req, res) => {
  try {
    const { user, date, time, reason } = req.body;

    const appointment = new Appointment({
      user,
      date,
      time,
      reason
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to create appointment", error: error.message });
  }
};

exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("user", "name email");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments", error: error.message });
  }
};
