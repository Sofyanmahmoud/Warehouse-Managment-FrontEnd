import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // user or admin
    if (username.toLowerCase() === 'admin') {
      console.log("Redirecting to Admin Dashboard...");
      navigate('/'); 
    } else {
      console.log("Redirecting to Customer Shop...");
      navigate('/shop'); 
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F3F4F6] px-4">
      {/* Compact Glass Card */}
      <div className="w-full max-w-[380px] bg-white/80 backdrop-blur-2xl border border-white rounded-[35px] shadow-2xl p-8 flex flex-col items-center">
        
        {/* Profile Icon */}
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4 shadow-inner">
          <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h1>
        <p className="text-gray-500 mb-8 font-medium text-xs uppercase tracking-wider text-center">
          Enter credentials to access your account
        </p>

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 ml-1">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Type 'admin' or your name"
              className="w-full bg-white/50 border border-gray-100 rounded-xl py-3 px-5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500 ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/50 border border-gray-100 rounded-xl py-3 px-5 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-white border border-gray-50 py-3.5 rounded-xl text-blue-600 font-bold text-base shadow-md hover:shadow-lg hover:bg-gray-50 transition-all mt-4"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-xs text-gray-400">
          Don't have an account? <Link to="/signup" className="text-blue-600 font-bold hover:underline">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;