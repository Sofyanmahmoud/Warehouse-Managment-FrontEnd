import { Link, useNavigate } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserRegistrationSchema, type UserRegistrationForm } from '../lib/validation';
import { register as registerUser } from '../api/auth';

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<UserRegistrationForm>({
    resolver: zodResolver(UserRegistrationSchema),
  });

  const onSubmit = async (data: UserRegistrationForm) => {
    try {
      await registerUser(data);
      navigate('/shop');
    } catch (err: any) {
      console.error(err);
      const message = err.response?.data?.message || 'Registration failed';
      setError('root', { message });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-noir-900 px-4">
      <div className="w-full max-w-[400px] bg-noir-800/80 backdrop-blur-2xl border border-white/5 rounded-[45px] shadow-2xl p-10 flex flex-col items-center">

        {/* Default Signup Icon */}
        <div className="w-16 h-16 bg-noir-700 rounded-full flex items-center justify-center mb-6 border border-white/5 shadow-inner">
          <UserPlusIcon className="w-7 h-7 text-accent-gold" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Create Account</h1>
        <p className="text-gray-500 mb-8 text-[10px] uppercase tracking-[0.3em] font-medium">Register</p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-600 ml-1 uppercase tracking-widest">Full Name</label>
            <input
              {...register('name')}
              type="text"
              placeholder="Enter name"
              className="w-full bg-noir-900/50 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-gray-700 focus:ring-1 focus:ring-accent-gold outline-none transition-all"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-600 ml-1 uppercase tracking-widest">Email Address</label>
            <input
              {...register('email')}
              type="email"
              placeholder="Enter email"
              className="w-full bg-noir-900/50 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-gray-700 focus:ring-1 focus:ring-accent-gold outline-none transition-all"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-600 ml-1 uppercase tracking-widest">Password</label>
            <input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              className="w-full bg-noir-900/50 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-gray-700 focus:ring-1 focus:ring-accent-gold outline-none transition-all"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-600 ml-1 uppercase tracking-widest">Confirm Password</label>
            <input
              {...register('password_confirmation')}
              type="password"
              placeholder="••••••••"
              className="w-full bg-noir-900/50 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-gray-700 focus:ring-1 focus:ring-accent-gold outline-none transition-all"
            />
            {errors.password_confirmation && <p className="text-red-500 text-xs mt-1">{errors.password_confirmation.message}</p>}
          </div>

          {errors.root && <p className="text-red-500 text-xs text-center">{errors.root.message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-gold py-4 rounded-2xl text-noir-900 font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:brightness-110 transition-all mt-4 disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'SignUp'}
          </button>
        </form>

        <p className="mt-8 text-[10px] text-gray-600 uppercase tracking-widest font-medium">
          Already Have Account ? <Link to="/login" className="text-accent-gold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;