import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { Search, MapPin } from 'lucide-react';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await API.get(`/doctors?search=${searchTerm}`);
      setDoctors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Available Doctors</h1>
      
      <div className="flex mb-10">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Search doctors by name or specialization..." 
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && fetchDoctors()}
          />
        </div>
        <button onClick={fetchDoctors} className="btn-primary ml-4">Search</button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-xl">Loading doctors...</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <div key={doctor._id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-center space-x-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  {doctor.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{doctor.name}</h3>
                  <p className="text-blue-600">{doctor.specialization}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-6 flex-grow">{doctor.bio || 'Experienced professional providing quality healthcare.'}</p>
              <div className="flex justify-between items-center mt-auto">
                <span className="font-bold text-gray-900">${doctor.fees} / visit</span>
                <Link to={`/doctor/${doctor._id}`} className="btn-primary">Book Now</Link>
              </div>
            </div>
          ))}
          {doctors.length === 0 && (
            <div className="col-span-full text-center py-20 bg-white rounded-xl">
              No doctors found matching your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
