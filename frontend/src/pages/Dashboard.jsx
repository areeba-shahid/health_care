import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Clock, CheckCircle, XCircle, User as UserIcon } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await API.get('/appointments/my');
      setAppointments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.patch(`/appointments/${id}/status`, { status });
      fetchAppointments();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      case 'completed': return 'text-blue-600 bg-blue-50';
      default: return 'text-yellow-600 bg-yellow-50';
    }
  };

  if (loading) return <div className="text-center py-20">Loading dashboard...</div>;

  return (
    <div className="container mx-auto px-4 py-10">
      <header className="mb-10">
        <h1 className="text-3xl font-bold">Welcome back, {user.name}</h1>
        <p className="text-gray-600">Managing your {user.role} dashboard</p>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold">Your Appointments</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs font-medium">
              <tr>
                <th className="px-6 py-4">{user.role === 'patient' ? 'Doctor' : 'Patient'}</th>
                <th className="px-6 py-4">Date & Time</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Notes</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                        <UserIcon size={20} />
                      </div>
                      <div>
                        <p className="font-bold">{user.role === 'patient' ? appt.doctor?.name : appt.patient?.name}</p>
                        <p className="text-sm text-gray-500">{user.role === 'patient' ? appt.doctor?.specialization : appt.patient?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium">{new Date(appt.date).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500">{appt.time}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(appt.status)}`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                    {appt.symptoms || '-'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {user.role === 'doctor' && appt.status === 'pending' && (
                        <button 
                          onClick={() => updateStatus(appt._id, 'confirmed')}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition"
                          title="Confirm"
                        >
                          <CheckCircle size={20} />
                        </button>
                      )}
                      {(appt.status === 'pending' || appt.status === 'confirmed') && (
                        <button 
                          onClick={() => updateStatus(appt._id, 'cancelled')}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                          title="Cancel"
                        >
                          <XCircle size={20} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {appointments.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-10 text-center text-gray-500">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
