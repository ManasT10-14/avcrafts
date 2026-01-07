import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutGrid, ArrowRight } from 'lucide-react';

const Catalog = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const catalogItems = [
        {
            id: 1,
            name: "Fridge Magnets",
            description: "Turn your memories into beautiful magnetic keepsakes.",
            image: "/images/fridge-magnets.png"
        },
        {
            id: 2,
            name: "Magnetic Frames",
            description: "Elegant magnetic frames for your walls.",
            image: "/images/magnetic-frames.png"
        }
    ];

    return (
        <div className="pt-32 pb-20 min-h-screen bg-earth-50">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-16">
                    <h1 className="heading-lg text-earth-900">Our Catalog</h1>
                    <p className="text-body max-w-2xl mx-auto">Select a category to customize yours.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {catalogItems.map((item, index) => (
                        <Link to={`/product/${item.id}`} key={item.id} className="group flex flex-col bg-white rounded-xl overflow-hidden border border-earth-100 hover:shadow-lg transition-all duration-300">
                            <div className="aspect-[4/3] bg-earth-100 overflow-hidden relative">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-2 rounded-full text-earth-900 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                    <ArrowRight size={20} />
                                </div>
                            </div>
                            <div className="p-8 text-center">
                                <h3 className="text-3xl font-serif text-earth-900 mb-3 group-hover:text-terracotta-600 transition-colors">
                                    {item.name}
                                </h3>
                                <p className="text-stone-600 text-base leading-relaxed mb-6">{item.description}</p>
                                <span className="inline-block text-sm font-medium uppercase tracking-widest text-earth-500 group-hover:text-terracotta-600 underline decoration-transparent group-hover:decoration-current transition-all">
                                    Customize Now
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Catalog;
