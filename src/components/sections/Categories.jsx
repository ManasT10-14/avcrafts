import React from 'react';
import { ArrowRight } from 'lucide-react';

const categories = [
    { id: 1, name: 'Custom Prints', image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400', count: '120+ items' },
    { id: 2, name: 'Handmade Gifts', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400', count: '85+ items' },
    { id: 3, name: 'Wall Art', image: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ec?auto=format&fit=crop&q=80&w=400', count: '200+ items' },
    { id: 4, name: 'Eco Stationery', image: 'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80&w=400', count: '50+ items' },
];

const Categories = () => {
    return (
        <section className="py-20 bg-earth-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-hand font-bold text-earth-900 mb-2">Shop by Category</h2>
                        <p className="text-earth-600">Explore our wide range of handcrafted collections</p>
                    </div>
                    <a href="#" className="hidden md:flex items-center gap-2 text-terracotta-600 font-medium hover:text-terracotta-700 transition-colors">
                        View All Categories <ArrowRight size={18} />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categories.map((cat) => (
                        <a key={cat.id} href="#" className="group relative rounded-2xl overflow-hidden aspect-[3/4] shadow-md hover:shadow-xl transition-all duration-300">
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-xl font-bold font-hand mb-1">{cat.name}</h3>
                                <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 delay-75">
                                    {cat.count}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <a href="#" className="inline-flex items-center gap-2 text-terracotta-600 font-medium hover:text-terracotta-700 transition-colors">
                        View All Categories <ArrowRight size={18} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Categories;
