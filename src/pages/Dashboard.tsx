import React from 'react';
import { Link } from 'react-router-dom';
const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Overview and Team */}
        <div className="col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold mb-6">Overview</h2>
            
            <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                <span className="text-gray-500 font-medium">Customers</span>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-green-600">10,243</span>
                  <span className="text-green-500 text-xs font-bold px-2 py-1 bg-green-50 rounded-full">8%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
                <span className="text-gray-500 font-medium">Income</span>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold">$39,403,450</span>
                  <span className="text-green-500 text-xs font-bold px-2 py-1 bg-green-50 rounded-full">3%</span>
                </div>
              </div>
            </div>

            <p className="mt-8 text-gray-800 font-medium">New Customers</p>
            
            {/* Team Grid */}
            <div className="grid grid-cols-4 gap-8 mt-12">
               {[1,2,3,4,5,6,7,8].map((i) => (
                 <div key={i} className="text-center group cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-blue-100 mx-auto mb-2 border-2 border-white shadow-md overflow-hidden transition group-hover:scale-105">
                        <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                    </div>
                    <p className="text-sm font-bold text-gray-700">ahmed {i}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div className="col-span-4 space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
             <h2 className="text-lg font-bold mb-4">Popular Products</h2>
             <div className="space-y-4">
                {[1,2,3,4].map(i => (
                    
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-xl"></div>
                      <div>
                        <p className="text-sm font-bold">Product {i}</p>
                        <p className="text-xs text-gray-400">tesst</p>
                      </div>
                    </div>
                    <span className="font-bold text-sm">$5461</span>
                  </div>
                ))}
             </div>
            <Link 
              to="/products" 
              className="block w-full mt-6 py-2 border border-gray-200 rounded-xl text-sm font-bold text-center text-gray-600 hover:bg-gray-50 transition-colors"
           >
              All Products
           </Link>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
             <h2 className="text-lg font-bold mb-4">Order</h2>
             <table className="w-full text-xs">
                <thead className="text-gray-400">
                  <tr>
                    <th className="text-left pb-2">Orders</th>
                    <th className="text-right pb-2">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                   {[1,2,3,4,5].map(i => (
                     <tr key={i}>
                        <td className="py-2 font-medium">Order_2</td>
                        <td className="py-2 text-right text-gray-400">7/12/2025</td>
                     </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;