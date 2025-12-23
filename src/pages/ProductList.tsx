import React, { useEffect, useState } from 'react';
import type { Product } from '../types';
import { inventoryService } from '../api/inventoryService';
import { EllipsisVerticalIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await inventoryService.getAllProducts();
        setProducts(data);
      } catch (error) {
        // Mock data matching your Figma style
        setProducts([
          { id: 1, name: 'Product A', sku: 'UI Kit', category: 'Design', current_stock: 10, min_stock: 2, price: 5461, updated_at: '' },
          { id: 2, name: 'Product B', sku: 'UI Kit', category: 'Development', current_stock: 5, min_stock: 10, price: 5461, updated_at: '' },
          { id: 3, name: 'Product C', sku: 'UI Kit', category: 'Saas', current_stock: 80, min_stock: 20, price: 5461, updated_at: '' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Inventory Items</h1>
        <span className="text-sm text-gray-500">{products.length} Total Products</span>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="divide-y divide-gray-50">
          {products.map((product) => (
            <div key={product.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors group">
              <div className="flex items-center gap-4">
                {/* Product Image Placeholder */}
                <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-50 transition-colors">
                  <span className="text-xs font-bold uppercase">{product.name.substring(0, 2)}</span>
                </div>
                
                <div>
                  <h3 className="font-bold text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-400">{product.sku}</p>
                </div>
              </div>

              <div className="flex items-center gap-12">
                {/* Stock Status */}
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Stock</p>
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${product.current_stock <= product.min_stock ? 'text-red-500' : 'text-gray-900'}`}>
                      {product.current_stock} units
                    </span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="text-right w-24">
                  <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-1">Price</p>
                  <p className="text-sm font-bold text-gray-900">${product.price}</p>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all" title="Increase Stock">
                    <ArrowUpIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all" title="Decrease Stock">
                    <ArrowDownIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-300 hover:text-gray-600">
                    <EllipsisVerticalIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;