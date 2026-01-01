const User = require('../models/User');

exports.getDoctors = async (req, res) => {
  try {
    const { specialization, search } = req.query;
    let query = { role: 'doctor' };

    if (specialization) {
      query.specialization = specialization;
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const doctors = await User.find(query).select('-password');
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await User.findById(req.params.id).select('-password');
    if (!doctor || doctor.role !== 'doctor') {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
