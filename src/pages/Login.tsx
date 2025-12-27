import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserLoginSchema, type UserLoginForm } from '../lib/validation';
import { login } from '../api/auth';

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<UserLoginForm>({
    resolver: zodResolver(UserLoginSchema),
  });

  const onSubmit = async (data: UserLoginForm) => {
    try {
      const response = await login(data);
      if (response.user.role === 'admin') {
        navigate('/'); // Admin Dashboard
      } else {
        navigate('/shop'); // Customer Shop
      }
    } catch (err: any) {
      console.error(err);
      const message = err.response?.data?.message || 'Login failed';
      setError('root', { message });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-noir-900 px-4">
      {/* Floating Dark Card */}
      <div className="w-full max-w-[380px] bg-noir-800/80 backdrop-blur-2xl border border-white/5 rounded-[40px] shadow-2xl p-10 flex flex-col items-center">

        {/* Minimalist Logo/Icon */}
        <div className="w-16 h-16 bg-noir-700 rounded-full flex items-center justify-center mb-6 border border-white/5 shadow-inner">
          <div className="w-6 h-6 rounded-full border-2 border-accent-gold animate-pulse"></div>
        </div>

        <h1 className="text-2xl font-bold text-white mb-1 tracking-tight">Welcome Back</h1>
        <p className="text-gray-500 mb-8 text-[10px] uppercase tracking-[0.3em] font-medium">ENTER YOUR DATA</p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-500 ml-1 uppercase tracking-widest">Email</label>
            <input
              {...register('email')}
              type="email"
              placeholder="Email Address"
              className="w-full bg-noir-900/50 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-gray-700 focus:ring-1 focus:ring-accent-gold outline-none transition-all shadow-inner"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-500 ml-1 uppercase tracking-widest">Password</label>
            <input
              {...register('password')}
              type="password"
              placeholder="••••••••"
              className="w-full bg-noir-900/50 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white placeholder:text-gray-700 focus:ring-1 focus:ring-accent-gold outline-none transition-all shadow-inner"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {errors.root && <p className="text-red-500 text-xs text-center">{errors.root.message}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-gold py-4 rounded-2xl text-noir-900 font-black text-xs uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(212,175,55,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 disabled:opacity-50"
          >
            {isSubmitting ? 'Loading...' : 'Login'}
          </button>
        </form>

        <p className="mt-8 text-[10px] text-gray-600 uppercase tracking-widest font-medium">
          New User? <Link to="/signup" className="text-accent-gold hover:underline">SignUp</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
