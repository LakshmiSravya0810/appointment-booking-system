const express = require('express');
const router = express.Router();

const Appointment = require('../models/Appointment'); // ✅ Add this line

const {
  createAppointment,
  getAppointmentsForUser,
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment
} = require('../controllers/appointmentController');

const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

// ✅ Get appointments for logged-in user
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const appointments = await Appointment.find({ userId }).sort({ date: -1 });
    res.json(appointments);
  } catch (err) {
    console.error('Error fetching user appointments:', err.message);
    res.status(500).json({ message: 'Failed to fetch appointments', error: err.message });
  }
});

// ✅ Appointment routes
router.post('/', authMiddleware, createAppointment);
router.get('/my', authMiddleware, getAppointmentsForUser);
router.get('/all', authMiddleware, authorizeRoles('admin'), getAllAppointments);
router.put('/:id/status', authMiddleware, authorizeRoles('admin'), updateAppointmentStatus);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteAppointment);

module.exports = router;
