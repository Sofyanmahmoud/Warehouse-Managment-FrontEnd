import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  CubeIcon, 
  UsersIcon, 
  QuestionMarkCircleIcon, 
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Products', path: '/products', icon: CubeIcon },
    { name: 'Customers', path: '/customers', icon: UsersIcon },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FA]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 mb-4">
          <div className="flex items-center gap-2 text-blue-600 font-bold italic">
            <span className="text-2xl font-black italic uppercase">WareHouse</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                  isActive ? 'bg-gray-100 text-black' : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-1">
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-lg">
            <QuestionMarkCircleIcon className="w-5 h-5" /> Contact
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg">
            <ArrowLeftOnRectangleIcon className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
       {/* Header */}
<header className="h-20 bg-white flex items-center justify-between px-8 border-b border-gray-100">
  
  {/* Your New Search Form */}
  <form className="w-full max-w-md">   
    <label htmlFor="search" className="sr-only">Search</label>
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
        </svg>
      </div>
      <input 
        type="search" 
        id="search" 
        className="block w-full p-3 ps-9 bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-indigo-500 focus:border-indigo-500 shadow-sm placeholder:text-gray-400 outline-none transition-all" 
        placeholder="Search" 
        required 
      />
      <button 
        type="button" 
        className="absolute end-1.5 bottom-1.5 text-white bg-indigo-600 hover:bg-indigo-700 font-medium leading-5 rounded-lg text-xs px-3 py-1.5 focus:outline-none transition-colors"
      >
        Search
      </button>
    </div>
  </form>
  
  {/* Right Side Actions */}
  <div className="flex items-center gap-4">
  <button className="bg-[#4F46E5] text-white px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm hover:bg-indigo-700 transition-all">
    <PlusIcon className="w-4 h-4" /> Create
  </button>
  
  {/* Your New Bordered Avatar */}
  <img 
    className="w-10 h-10 p-1 rounded-full ring-2 ring-gray-200" 
    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" 
    alt="Bordered avatar" 
  />
</div>
</header>

        <main className="flex-1 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;