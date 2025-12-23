import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F3F4F6] px-4">
      {/* Compact Glass Card */}
      <div className="w-full max-w-[380px] bg-white/80 backdrop-blur-2xl border border-white rounded-[35px] shadow-2xl p-8 flex flex-col items-center">
        
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
        <p className="text-gray-500 mb-8 font-medium text-xs uppercase tracking-wider">Join the Admin Team</p>

        <form className="w-full space-y-3.5">
            
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 ml-1">Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe" 
              className="w-full bg-white/50 border border-gray-100 rounded-xl py-3 px-5 text-sm outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition-all" 
            />
            
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 ml-1">Email Address</label>
            <input 
              type="email" 
              placeholder="john@example.com" 
              className="w-full bg-white/50 border border-gray-100 rounded-xl py-3 px-5 text-sm outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition-all" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 ml-1">Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full bg-white/50 border border-gray-100 rounded-xl py-3 px-5 text-sm outline-none shadow-sm focus:ring-2 focus:ring-blue-500 transition-all" 
            />
          </div>
          
          <button className="w-full bg-blue-600 py-3.5 rounded-xl text-white font-bold text-base shadow-lg hover:bg-blue-700 transition-all mt-4">
            Get Started
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-400">
          Already a member? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;