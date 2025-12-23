import React, { useEffect, useState } from 'react';
import type { Customer } from '../types';
import { customerService } from '../api/customerService';
import { EnvelopeIcon, PhoneIcon, EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    customerService.getAllCustomers().then(setCustomers);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <button className="text-sm font-bold text-blue-600 hover:underline">View Analytics</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customers.map((customer) => (
          <div key={customer.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative group">
            <button className="absolute top-4 right-4 text-gray-300 hover:text-gray-600">
              <EllipsisHorizontalIcon className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-blue-50 border-4 border-white shadow-sm overflow-hidden mb-4">
                <img 
                  src={`https://i.pravatar.cc/150?u=${customer.email}`} 
                  alt={customer.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h3 className="text-lg font-bold text-gray-900">{customer.name}</h3>
              <p className="text-sm text-gray-400 mb-4">{customer.email}</p>

              <div className="flex gap-2 mb-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  customer.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  {customer.status}
                </span>
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                  {customer.total_orders} Orders
                </span>
              </div>

              <div className="w-full grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-600 transition-colors">
                  <EnvelopeIcon className="w-4 h-4" /> Email
                </button>
                <button className="flex items-center justify-center gap-2 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-xs font-bold text-gray-600 transition-colors">
                  <PhoneIcon className="w-4 h-4" /> Call
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;