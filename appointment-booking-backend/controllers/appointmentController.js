const Appointment = require('../models/Appointment');

// ✅ Create a new appointment (any user)
exports.createAppointment = async (req, res) => {
  try {
    const { name, email, phone, doctor, date, time, reason } = req.body;

    const appointment = new Appointment({
      userId: req.user.id, // ✅ Link appointment to logged-in user
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

// ✅ Get appointments for the logged-in user (based on userId)
exports.getAppointmentsForUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const appointments = await Appointment.find({ userId }).sort({ date: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Error in getAppointmentsForUser:", error.message);
    res.status(500).json({ message: "Failed to fetch your appointments", error: error.message });
  }
};

// ✅ Get all appointments (admin-only route)
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Error in getAllAppointments:", error.message);
    res.status(500).json({ message: "Failed to fetch all appointments", error: error.message });
  }
};

// ✅ Update appointment status (admin only)
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updated = await Appointment.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Status updated', appointment: updated });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update status', error: error.message });
  }
};

// ✅ Update appointment date and time (user reschedule) with future validation
exports.updateAppointmentDateTime = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time } = req.body;

    if (!date || !time) {
      return res.status(400).json({ message: 'Date and time are required' });
    }

    // Validate future date and time
    const newDateTime = new Date(`${date}T${time}`);
    if (newDateTime <= new Date()) {
      return res.status(400).json({ message: 'Date and time must be in the future' });
    }

    const updated = await Appointment.findByIdAndUpdate(
      id,
      { date, time },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment rescheduled', appointment: updated });
  } catch (error) {
    console.error('❌ Error updating appointment date/time:', error.message);
    res.status(500).json({ message: 'Failed to reschedule appointment', error: error.message });
  }
};

// ✅ Delete appointment (admin only)
exports.deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('❌ Error deleting appointment:', error.message);
    res.status(500).json({ message: 'Failed to delete appointment', error: error.message });
  }
};
