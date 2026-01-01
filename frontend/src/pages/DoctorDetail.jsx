import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

const DoctorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [msg, setMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await API.get(`/doctors/${id}`);
        setDoctor(data);
      } catch (err) {
        setMsg({ type: 'error', text: 'Doctor not found' });
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    
    try {
      await API.post('/appointments', {
        doctorId: id,
        date: bookingDate,
        time: bookingTime,
        symptoms
      });
      setMsg({ type: 'success', text: 'Appointment booked successfully!' });
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.message || 'Booking failed' });
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!doctor) return <div className="text-center py-20">Doctor not found</div>;

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden grid md:grid-cols-3">
        <div className="md:col-span-1 bg-blue-600 p-8 text-white text-center">
          <div className="h-32 w-32 rounded-full bg-white mx-auto mb-4 flex items-center justify-center text-blue-600 text-4xl font-bold">
            {doctor.name.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold">{doctor.name}</h2>
          <p className="text-blue-100 mb-4">{doctor.specialization}</p>
          <div className="bg-blue-500 rounded-lg p-3 inline-block">
            <span className="text-xl font-bold">${doctor.fees}</span>
            <span className="block text-xs uppercase opacity-75">Per Consultation</span>
          </div>
        </div>
        
        <div className="md:col-span-2 p-8">
          <h3 className="text-xl font-bold mb-4">About Doctor</h3>
          <p className="text-gray-600 mb-8">{doctor.bio || 'Dr. ' + doctor.name + ' is a highly skilled professional with expertise in ' + doctor.specialization + '.'}</p>
          
          <h3 className="text-xl font-bold mb-4">Book an Appointment</h3>
          {msg.text && (
            <div className={`p-4 rounded-lg mb-4 flex items-center space-x-2 ${msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              <AlertCircle size={20} />
              <span>{msg.text}</span>
            </div>
          )}
          
          <form onSubmit={handleBooking} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center">
                  <Calendar size={16} className="mr-1" /> Date
                </label>
                <input 
                  type="date" 
                  className="input-field" 
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 flex items-center">
                  <Clock size={16} className="mr-1" /> Time
                </label>
                <select 
                  className="input-field"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                  required
                >
                  <option value="">Select Time</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Brief Symptoms / Notes</label>
              <textarea 
                className="input-field min-h-[100px]" 
                placeholder="Briefly describe your health concern..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
              ></textarea>
            </div>
            <button type="submit" className="w-full btn-primary py-4 text-lg">
              Confirm Appointment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
