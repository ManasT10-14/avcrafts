import React from 'react';
import ProductCard from '../common/ProductCard';

// Static placeholder data for homepage (different from API)
const products = [
    {
        id: 1,
        title: 'Circle Photo Magnet',
        price: '₹299',
        category: 'Fridge Magnets',
        image: '/images/fridge-magnets.png'
    },
    {
        id: 1,
        title: 'Rectangle Photo Magnet',
        price: '₹349',
        category: 'Fridge Magnets',
        image: '/images/fridge-magnets.png'
    },
    {
        id: 2,
        title: 'Mini Magnetic Frame',
        price: '₹499',
        category: 'Magnetic Frames',
        image: '/images/magnetic-frames.png'
    },
    {
        id: 2,
        title: 'Wall Magnetic Frame',
        price: '₹899',
        category: 'Magnetic Frames',
        image: '/images/magnetic-frames.png'
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
                    {/* <button className="btn-secondary">View All Products</button> */}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
