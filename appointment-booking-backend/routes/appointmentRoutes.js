const express = require('express');
const router = express.Router();

const {
  createAppointment,
  getAppointmentsForUser,
  getAllAppointments,
  updateAppointmentStatus,
  updateAppointmentDateTime,
  deleteAppointment
} = require('../controllers/appointmentController');

const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

// ✅ Use controller for fetching user appointments (Fixes auto-refresh issue)
router.get('/user', authMiddleware, getAppointmentsForUser);

// ✅ Appointment CRUD routes
router.post('/', authMiddleware, createAppointment);
router.get('/my', authMiddleware, getAppointmentsForUser); // optional if /user is used
router.get('/all', authMiddleware, authorizeRoles('admin'), getAllAppointments);
router.put('/:id/status', authMiddleware, authorizeRoles('admin'), updateAppointmentStatus);
router.put('/:id', authMiddleware, updateAppointmentDateTime);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteAppointment);

module.exports = router;
