import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductUpsertSchema, type ProductUpsertForm } from '../lib/validation';
import { createProduct, updateProduct, type Category, getCategories } from '../api/products';

interface ProductFormProps {
    product?: any;
    onSuccess: () => void;
    onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSuccess, onCancel }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
        resolver: zodResolver(ProductUpsertSchema),
        defaultValues: (product ? {
            name: product.name,
            description: product.description || '',
            price: Number(product.price),
            quantity: Number(product.quantity),
            category_id: Number(product.category_id), // Ensure number
            image: product.image || '',
        } : {
            name: '',
            description: '',
            price: 0,
            quantity: 0,
            category_id: 0, // Default 0 or undefined, zod will catch if 0 < positive
            image: '',
        }) as ProductUpsertForm
    });

    useEffect(() => {
        // Fetch categories
        getCategories().then(setCategories).catch(console.error);
    }, []);

    const onSubmit = async (data: any) => {
        try {
            if (product) {
                await updateProduct(product.id, data);
            } else {
                await createProduct(data);
            }
            onSuccess();
        } catch (err: any) {
            console.error(err);
            const message = err.response?.data?.message || 'Operation failed';
            setError('root', { message });
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-1">Product Name</label>
                <input
                    {...register('name')}
                    type="text"
                    className="w-full bg-noir-900 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white focus:ring-1 focus:ring-accent-gold outline-none transition-all"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-1">Price ($)</label>
                    <input
                        {...register('price')}
                        type="number"
                        step="0.01"
                        className="w-full bg-noir-900 border border-white/5 rounded-2xl py-4 px-6 text-sm text-accent-gold font-mono outline-none"
                    />
                    {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-1">Quantity</label>
                    <input
                        {...register('quantity')}
                        type="number"
                        className="w-full bg-noir-900 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white outline-none"
                    />
                    {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-gray-600 uppercase tracking-widest ml-1">Category</label>
                <select
                    {...register('category_id')}
                    className="w-full bg-noir-900 border border-white/5 rounded-2xl py-4 px-6 text-sm text-white focus:ring-1 focus:ring-accent-gold outline-none transition-all appearance-none"
                >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
                {errors.category_id && <p className="text-red-500 text-xs mt-1">{errors.category_id.message}</p>}
            </div>

            {errors.root && <p className="text-red-500 text-xs text-center">{errors.root.message}</p>}

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 bg-transparent border border-white/10 py-4 rounded-2xl text-gray-400 font-bold text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] bg-accent-gold py-4 rounded-2xl text-noir-900 font-black text-[10px] uppercase tracking-widest shadow-lg hover:brightness-110 transition-all disabled:opacity-50"
                >
                    {isSubmitting ? 'Saving...' : (product ? 'Update Record' : 'Create Record')}
                </button>
            </div>

            {product && (
                <div className="pt-4 border-t border-white/5">
                    {/* Delete button logic should be handled by parent or passed down, but for now we focus on Upsert */}
                </div>
            )}
        </form>
    );
};

export default ProductForm;
