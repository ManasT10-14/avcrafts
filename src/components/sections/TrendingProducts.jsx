import React from 'react';
import ProductCard from '../common/ProductCard';

const products = [
    {
        id: 1,
        title: 'Hand-painted Ceramic Mug',
        price: '$24.00',
        category: 'Ceramics',
        image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 2,
        title: 'Personalized Journal',
        price: '$32.00',
        category: 'Stationery',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 3,
        title: 'Woven Wall Hanging',
        price: '$85.00',
        category: 'Wall Art',
        image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ec?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 4,
        title: 'Botanical Print Set',
        price: '$45.00',
        category: 'Art Prints',
        image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&q=80&w=400'
    }
];

const TrendingProducts = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-terracotta-600 font-medium tracking-wider uppercase text-sm">Our Favourites</span>
                    <h2 className="text-4xl font-hand font-bold text-earth-900 mt-2 mb-4">Trending This Week</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                        />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="btn-secondary">View All Products</button>
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
