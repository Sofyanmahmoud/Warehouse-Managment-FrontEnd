import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-slate-800 text-blue-400">
          WH Admin
        </div>
        <nav className="flex-1 p-4 space-y-2 text-sm">
          <Link to="/" className="block p-3 hover:bg-slate-800 rounded-lg transition">📦 Inventory</Link>
          <Link to="/users" className="block p-3 hover:bg-slate-800 rounded-lg transition">👥 Users</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-end px-8 font-medium">
          Admin Dashboard
        </header>
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;