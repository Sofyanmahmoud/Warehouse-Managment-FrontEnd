import { useState, useEffect } from 'react';
import {
  PlusIcon,
  EllipsisVerticalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import { getProducts, deleteProduct, type Product } from '../api/products';
import ProductForm from '../components/ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setEditingProduct(null);
        fetchProducts();
      } catch (error) {
        console.error("Failed to delete", error);
      }
    }
  };

  const handleSuccess = () => {
    setEditingProduct(null);
    setIsCreating(false);
    fetchProducts();
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight italic">Inventory<span className="text-accent-gold">.</span></h1>
          <p className="text-gray-500 text-[10px] uppercase tracking-[0.2em] mt-1 font-bold">Secure Stock Vault</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-64">
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter assets..."
              className="w-full bg-noir-800 border border-white/5 rounded-2xl py-2.5 pl-11 pr-4 text-xs text-white placeholder:text-gray-700 focus:ring-1 focus:ring-accent-gold outline-none transition-all"
            />
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-accent-gold text-noir-900 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-[0_10px_20px_rgba(212,175,55,0.1)]"
          >
            <PlusIcon className="w-4 h-4 stroke-[4px]" /> Add Item
          </button>
        </div>
      </div>

      {/* Cleaned Table - No Progress Bars */}
      <div className="bg-noir-800 rounded-[40px] border border-white/5 shadow-2xl overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-accent-gold">Loading Inventory...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/5">
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Identification</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Category</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Valuation</th>
                <th className="px-8 py-6 text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Quantity</th>
                <th className="px-8 py-6"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-noir-900 rounded-xl border border-white/5 flex items-center justify-center text-gray-700 group-hover:text-accent-gold transition-colors">
                        <ShoppingBagIcon className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-white text-sm tracking-tight group-hover:text-accent-gold transition-colors">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">{product.category}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-accent-gold font-mono font-bold text-sm tracking-tighter">
                      ${Number(product.price).toFixed(2)}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-gray-400 text-xs font-bold tracking-tight">
                      {product.quantity} <span className="text-[10px] text-gray-600 font-medium uppercase ml-1">Units</span>
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="p-2 text-gray-700 hover:text-white transition-all"
                    >
                      <EllipsisVerticalIcon className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-gray-500">No products found.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Edit/Create Modal */}
      {(editingProduct || isCreating) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-noir-900/80 backdrop-blur-sm p-4">
          <div className="bg-noir-800 border border-white/10 w-full max-w-md rounded-[45px] p-10 relative animate-in zoom-in duration-300">
            <button
              onClick={() => { setEditingProduct(null); setIsCreating(false); }}
              className="absolute top-8 right-8 text-gray-500 hover:text-white"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-white mb-1 italic">
              {isCreating ? 'New Asset' : 'Edit Asset'}<span className="text-accent-gold">.</span>
            </h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-8 font-bold">
              {isCreating ? 'Add to Vault' : 'Modify System Record'}
            </p>

            <ProductForm
              product={editingProduct}
              onSuccess={handleSuccess}
              onCancel={() => { setEditingProduct(null); setIsCreating(false); }}
            />

            {editingProduct && (
              <div className="pt-4 border-t border-white/5 mt-4">
                <button
                  onClick={() => handleDelete(editingProduct.id)}
                  className="w-full bg-transparent border border-red-500/20 py-3 rounded-2xl text-red-500 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-red-500/10 transition-all"
                >
                  Delete Permanent Record
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
