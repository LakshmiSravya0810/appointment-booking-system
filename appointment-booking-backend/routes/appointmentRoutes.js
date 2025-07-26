const express = require('express');
const router = express.Router();

const {
  createAppointment,
  getAppointmentsForUser,
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment
} = require('../controllers/appointmentController');

const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

// Appointment routes
router.post('/', authMiddleware, createAppointment);
router.get('/my', authMiddleware, getAppointmentsForUser);
router.get('/all', authMiddleware, authorizeRoles('admin'), getAllAppointments);
router.put('/:id/status', authMiddleware, authorizeRoles('admin'), updateAppointmentStatus);
router.delete('/:id', authMiddleware, authorizeRoles('admin'), deleteAppointment);

module.exports = router;
