import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient',
    specialization: '',
    fees: '',
    bio: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Join HealthCare</h2>
      {error && <div className="bg-red-100 text-red-600 p-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input 
            name="name"
            type="text" 
            className="input-field" 
            value={formData.name} 
            onChange={handleChange} 
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            name="email"
            type="email" 
            className="input-field" 
            value={formData.email} 
            onChange={handleChange} 
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input 
            name="password"
            type="password" 
            className="input-field" 
            value={formData.password} 
            onChange={handleChange} 
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">I am a:</label>
          <select 
            name="role"
            className="input-field" 
            value={formData.role} 
            onChange={handleChange}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Healthcare Provider (Doctor)</option>
          </select>
        </div>

        {formData.role === 'doctor' && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Specialization</label>
              <input 
                name="specialization"
                type="text" 
                className="input-field" 
                value={formData.specialization} 
                onChange={handleChange} 
                placeholder="e.g. Cardiologist"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Consultation Fees ($)</label>
              <input 
                name="fees"
                type="number" 
                className="input-field" 
                value={formData.fees} 
                onChange={handleChange} 
                required
              />
            </div>
          </>
        )}

        <button type="submit" className="w-full btn-primary py-3" disabled={loading}>
          {loading ? 'Creating account...' : 'Register'}
        </button>
      </form>
      <p className="text-center mt-4 text-gray-600">
        Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
      </p>
    </div>
  );
};

export default Register;
