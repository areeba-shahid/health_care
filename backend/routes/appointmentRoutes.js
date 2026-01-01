const express = require('express');
const router = express.Router();
const { bookAppointment, getMyAppointments, updateAppointmentStatus } = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);
router.post('/', bookAppointment);
router.get('/my', getMyAppointments);
router.patch('/:id/status', updateAppointmentStatus);

module.exports = router;
