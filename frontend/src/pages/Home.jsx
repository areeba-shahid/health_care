import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Shield, Users } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex flex-col">
      <section className="bg-blue-600 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Your Health, Our Priority</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Book appointments with top specialists in minutes. Quality healthcare made accessible and easy.</p>
        <Link to="/doctors" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition">
          Find a Doctor
        </Link>
      </section>

      <section className="container mx-auto py-20 px-4 grid md:grid-cols-3 gap-10">
        <div className="p-8 bg-white rounded-xl shadow-sm text-center">
          <Calendar className="mx-auto text-blue-600 mb-4" size={48} />
          <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
          <p className="text-gray-600">Pick your preferred doctor and time slot in just a few clicks.</p>
        </div>
        <div className="p-8 bg-white rounded-xl shadow-sm text-center">
          <Shield className="mx-auto text-blue-600 mb-4" size={48} />
          <h3 className="text-xl font-bold mb-2">Secure & Private</h3>
          <p className="text-gray-600">Your medical data and appointments are handled with strict privacy.</p>
        </div>
        <div className="p-8 bg-white rounded-xl shadow-sm text-center">
          <Users className="mx-auto text-blue-600 mb-4" size={48} />
          <h3 className="text-xl font-bold mb-2">Verified Doctors</h3>
          <p className="text-gray-600">All our healthcare providers are verified professionals with years of experience.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
