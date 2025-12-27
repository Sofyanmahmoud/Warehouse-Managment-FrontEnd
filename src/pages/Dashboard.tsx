import { Link } from 'react-router-dom';
import {
  ShoppingBagIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const stats = [
    { label: 'net revenue', value: '$128,430', change: '+12.5%', up: true },
    { label: 'active customers', value: '1,240', change: '+3.2%', up: true },
    { label: 'new customers', value: '45', change: '12.1%', up: true },
  ];

  const popularProducts = [
    { id: 1, name: 'item 1', price: '$850', sales: '1,200 units' },
    { id: 2, name: 'item 2', price: '$120', sales: '850 units' },
    { id: 3, name: 'item 3', price: '$340', sales: '520 units' },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-noir-800 p-8 rounded-[35px] border border-white/5 shadow-2xl group hover:border-accent-gold/30 transition-all">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4 group-hover:text-accent-gold">{stat.label}</p>
            <div className="flex items-end justify-between">
              <h2 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h2>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${stat.up ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-noir-800 rounded-[45px] border border-white/5 shadow-2xl overflow-hidden">
        <div className="p-10 flex justify-between items-center border-b border-white/5">
          <h3 className="text-xl font-bold text-white tracking-tight">Popular Products</h3>
          <Link to="/products" className="flex items-center gap-2 text-accent-gold hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">All Products <ChevronRightIcon className="w-4 h-4" /></Link>
        </div>
        <div className="p-6">
          {popularProducts.map((product) => (
            <div key={product.id} className="flex items-center justify-between p-4 rounded-[25px] hover:bg-white/[0.02] border border-transparent hover:border-white/5 group">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-noir-900 rounded-2xl border border-white/5 flex items-center justify-center shadow-inner group-hover:border-accent-gold/30 transition-all">
                  <ShoppingBagIcon className="w-6 h-6 text-gray-600 group-hover:text-accent-gold" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm tracking-tight">{product.name}</h4>
                  <p className="text-gray-500 text-xs font-medium">{product.sales}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-accent-gold font-mono font-bold">{product.price}</p>
                <p className="text-[10px] text-gray-600 uppercase font-black tracking-tighter">Unit Price</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;