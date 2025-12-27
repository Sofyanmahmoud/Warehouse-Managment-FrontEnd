import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, ShoppingCartIcon, UsersIcon, 
  QuestionMarkCircleIcon, ArrowLeftOnRectangleIcon,
  BellIcon, UserIcon
} from '@heroicons/react/24/outline';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Products', path: '/products', icon: ShoppingCartIcon },
    { name: 'Customers', path: '/customers', icon: UsersIcon },
  ];

  return (
    <div className="flex min-h-screen bg-noir-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-noir-800 border-r border-white/5 flex flex-col fixed h-full z-20">
        <div className="p-8">
          <h1 className="text-2xl font-black italic text-white tracking-tighter">
            WAREHOUSE <span className="text-accent-gold">...</span>
          </h1>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${
                location.pathname === link.path 
                ? 'bg-white/5 text-accent-gold shadow-lg' 
                : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span className="font-bold text-sm">{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 space-y-1">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-500 hover:text-white transition-all">
            <QuestionMarkCircleIcon className="w-5 h-5" />
            <span className="font-bold text-sm">Contact</span>
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-500/10 rounded-2xl transition-all group"
          >
            <ArrowLeftOnRectangleIcon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content*/}
      <div className="flex-1 ml-64 flex flex-col">
        <header className="h-24 px-8 flex items-center justify-end sticky top-0 bg-noir-900/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-6">
            <button className="text-gray-500 hover:text-accent-gold relative transition-colors">
                <BellIcon className="w-6 h-6" />
                <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-accent-gold rounded-full border-2 border-noir-900"></span>
            </button>
            <div className="w-10 h-10 rounded-full bg-noir-800 border-2 border-accent-gold flex items-center justify-center shadow-lg">
                <UserIcon className="w-5 h-5 text-accent-gold" />
            </div>
          </div>
        </header>

        <main className="p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;