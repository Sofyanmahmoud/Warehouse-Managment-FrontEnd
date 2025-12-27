import { useState } from 'react';
import { UserIcon, EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const customers = [
    { name: 'cus1', email: 'cus1@example.com', status: 'Active', orders: '1 Orders' },
    { name: 'cus2', email: 'cus2@example.com', status: 'Active', orders: '2 Orders' },
    { name: 'cus3', email: 'cus3@example.com', status: 'Inactive', orders: '3 Orders' },
    { name: 'cus4', email: 'cus4@example.com', status: 'Inactive', orders: '4 Orders' },
  ];

  // Logic to filter customers based on name or email
  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header with Search */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white italic">Customers</h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.3em] mt-1 font-bold">Authorized Users</p>
        </div>

        {/* Noir Search Bar */}
        <div className="relative w-full md:w-64">
          <MagnifyingGlassIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            placeholder="Search By Email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-noir-800 border border-white/5 rounded-2xl py-2.5 pl-11 pr-4 text-xs text-white placeholder:text-gray-700 focus:ring-1 focus:ring-accent-gold outline-none transition-all shadow-inner"
          />
        </div>
      </div>

      {/* 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((c) => (
            <div
              key={c.email}
              className="bg-noir-800 border border-white/5 p-8 rounded-[45px] flex flex-col items-center shadow-2xl hover:border-accent-gold/20 transition-all group relative overflow-hidden"
            >
              <button className="absolute top-6 right-8 text-gray-700 hover:text-white transition-colors">
                <EllipsisHorizontalIcon className="w-5 h-5" />
              </button>

              <div className="w-20 h-20 rounded-full bg-noir-900 border border-white/5 shadow-inner flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-500">
                <UserIcon className="w-8 h-8 text-gray-700 group-hover:text-accent-gold transition-colors" />
              </div>

              <h3 className="text-base font-bold text-white tracking-tight mb-1 group-hover:text-accent-gold transition-colors">
                {c.name}
              </h3>

              <p className="text-gray-600 text-[10px] mb-8 font-mono tracking-tighter italic">
                {c.email}
              </p>

              <div className="flex gap-2 w-full justify-center pt-6 border-t border-white/5">
                <span className={`px-3 py-1 text-[9px] font-black uppercase rounded-lg border ${c.status === 'Active'
                    ? 'bg-green-500/5 text-green-500 border-green-500/10'
                    : 'bg-noir-700 text-gray-500 border-white/5'
                  }`}>
                  {c.status}
                </span>
                <span className="px-3 py-1 bg-white/5 text-gray-400 text-[9px] font-black uppercase rounded-lg border border-white/5">
                  {c.orders}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-gray-600 font-mono text-xs uppercase tracking-[0.3em]">User Not Found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;