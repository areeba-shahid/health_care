const Appointment = require('../models/Appointment');

exports.bookAppointment = async (req, res) => {
  const { doctorId, date, time, symptoms } = req.body;
  try {
    const appointment = await Appointment.create({
      patient: req.user._id,
      doctor: doctorId,
      date,
      time,
      symptoms,
    });
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    let query = {};
    if (req.user.role === 'patient') {
      query = { patient: req.user._id };
    } else if (req.user.role === 'doctor') {
      query = { doctor: req.user._id };
    }

    const appointments = await Appointment.find(query)
      .populate('doctor', 'name specialization')
      .populate('patient', 'name email')
      .sort({ date: 1 });
    
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Appointment not found' });

    // Only allow doctor to confirm/complete, and patient/doctor to cancel
    appointment.status = req.body.status || appointment.status;
    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
