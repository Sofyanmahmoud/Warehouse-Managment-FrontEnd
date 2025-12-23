import React, { useEffect, useState } from 'react';
import type { Product } from '../types';
import { inventoryService } from '../api/inventoryService';

const Inventory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We will call the API here
    // For now, if the backend isn't ready, it might fail, 
    // but the structure is 100% correct.
    const loadProducts = async () => {
      try {
        const data = await inventoryService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Backend not reachable yet, using mock data for UI test");
        // Mock data for your UI testing:
        setProducts([
          { id: 1, name: 'Pallet Jack', sku: 'PJ-001', category: 'Tools', current_stock: 5, min_stock: 2, price: 299, updated_at: '' },
          { id: 2, name: 'Cardboard Boxes', sku: 'BX-102', category: 'Storage', current_stock: 150, min_stock: 50, price: 2, updated_at: '' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Inventory Management</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + Add New Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Product</th>
              <th className="p-4 font-semibold text-gray-600">SKU</th>
              <th className="p-4 font-semibold text-gray-600">Stock</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition">
                <td className="p-4">
                  <div className="font-medium text-gray-900">{product.name}</div>
                  <div className="text-sm text-gray-500">{product.category}</div>
                </td>
                <td className="p-4 text-gray-600 font-mono text-sm">{product.sku}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    product.current_stock <= product.min_stock 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-green-100 text-green-700'
                  }`}>
                    {product.current_stock} in stock
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  <button className="text-blue-600 hover:bg-blue-50 px-3 py-1 rounded">Edit</button>
                  <button className="text-green-600 hover:bg-green-50 px-3 py-1 rounded">Update Stock</button>
                </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventory;