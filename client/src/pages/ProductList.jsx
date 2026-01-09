import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { Clock } from 'lucide-react';
import api from '../utils/api';

const ProductList = () => {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryName, setCategoryName] = useState('Products');

    useEffect(() => {
        // In a real app, fetch category name too. For now hardcode or infer.
        if (categoryId === '1') setCategoryName('Fridge Magnets');

        fetch(api.getProducts(categoryId))
            .then(res => res.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, [categoryId]);

    return (
        <div className="pt-24 pb-20 min-h-screen">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-8">
                    <Link to="/" className="text-earth-500 hover:text-terracotta-500 mb-4 inline-block font-medium uppercase tracking-wide text-xs">&larr; Back to Home</Link>
                    <h1 className="text-4xl font-serif font-bold text-earth-900">{categoryName}</h1>
                    <p className="text-earth-600 flex items-center gap-2 mt-2">
                        <Clock size={16} /> Made to order · Ships in 2-4 days
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terracotta-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <Link key={product.id} to={`/product/${product.id}`}>
                                    <ProductCard
                                        title={product.name}
                                        price={`₹${product.price}`}
                                        image={product.image_url}
                                        category={categoryName}
                                    />
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-earth-500">
                                No products found in this category yet.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
