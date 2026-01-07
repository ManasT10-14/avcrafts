import React from 'react';
import { Heart, Eye } from 'lucide-react';

const ProductCard = ({ title, price, image, category }) => {
    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-earth-100">
            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden bg-earth-100">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <button className="p-3 bg-white rounded-full text-earth-800 hover:text-terracotta-500 hover:scale-110 transition-all shadow-lg" aria-label="Quick View">
                        <Eye size={20} />
                    </button>
                    <button className="p-3 bg-white rounded-full text-earth-800 hover:text-red-500 hover:scale-110 transition-all shadow-lg" aria-label="Add to Wishlist">
                        <Heart size={20} />
                    </button>
                </div>

                {/* Badge */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold rounded-full text-earth-800 uppercase tracking-wide">
                    {category}
                </span>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-hand text-xl font-bold text-earth-900 mb-1 group-hover:text-terracotta-600 transition-colors">
                    {title}
                </h3>
                <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-terracotta-600">{price}</span>
                    <button className="text-sm font-medium text-earth-500 hover:text-earth-900 underline decoration-terracotta-500/50 hover:decoration-terracotta-500 transition-all">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
