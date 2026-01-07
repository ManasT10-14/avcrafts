import React from 'react';
import { Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
    {
        id: 1,
        name: 'Fridge Magnets',
        image: '/images/fridge-magnets.png',
        count: '12+ designs',
        status: 'active'
    },
    {
        id: 2,
        name: 'Wall Art',
        image: '/images/gallery-wall.png',
        count: 'Coming Soon',
        status: 'coming_soon'
    },
    {
        id: 3,
        name: 'Personalized Gifts',
        image: '/images/polaroid-memories.png',
        count: 'Coming Soon',
        status: 'coming_soon'
    },
    {
        id: 4,
        name: 'DIY Kits',
        image: '/images/craftsman.png',
        count: 'Coming Soon',
        status: 'coming_soon'
    },
];

const Categories = () => {
    return (
        <section className="py-20 bg-earth-50" id="shop">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-hand font-bold text-earth-900 mb-2">Explore Collections</h2>
                        <p className="text-earth-600">Handcrafted pieces, made just for you.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        cat.status === 'active' ? (
                            <Link
                                to={`/category/${cat.id}`}
                                key={cat.id}
                                className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-all duration-300 block"
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <h3 className="text-xl font-bold font-hand mb-1">{cat.name}</h3>
                                    <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 delay-75">
                                        {cat.count}
                                    </p>
                                </div>
                            </Link>
                        ) : (
                            <div
                                key={cat.id}
                                className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md transition-all duration-300 opacity-80 cursor-not-allowed"
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover grayscale"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                                {/* Coming Soon Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
                                    <span className="bg-white/90 text-earth-900 px-4 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                                        <Lock size={14} /> Coming Soon
                                    </span>
                                </div>

                                <div className="absolute bottom-0 left-0 p-6 text-white">
                                    <h3 className="text-xl font-bold font-hand mb-1">{cat.name}</h3>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
