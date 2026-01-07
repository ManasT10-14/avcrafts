import React from 'react';
import { Link } from 'react-router-dom';
import { Frame, Palette } from 'lucide-react';

const Services = () => {
    // Two simplified categories linking directly to products
    const categories = [
        {
            icon: <Palette size={32} strokeWidth={1} />,
            title: "Fridge Magnets",
            description: "Beautiful magnetic keepsakes for your home.",
            image: "/images/fridge-magnets.png",
            link: "/product/1"
        },
        {
            icon: <Frame size={32} strokeWidth={1} />,
            title: "Magnetic Frames",
            description: "Handcrafted frames tailored to your art.",
            image: "/images/magnetic-frames.png",
            link: "/product/2"
        }
    ];

    return (
        <section id="services" className="section-padding bg-white">
            <div className="text-center mb-16">
                <h2 className="heading-md text-earth-800">Shop by Category</h2>
                <div className="w-16 h-[1px] bg-earth-400 mx-auto mb-6"></div>
                <p className="text-body max-w-2xl mx-auto">
                    Discover our collection of handcrafted items.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                {categories.map((cat, index) => (
                    <Link to={cat.link} key={index} className="group cursor-pointer block">
                        <div className="relative overflow-hidden rounded-lg mb-6 aspect-[4/5] bg-earth-100 shadow-md">
                            <img
                                src={cat.image}
                                alt={cat.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                            <div className="absolute bottom-6 left-6 text-white">
                                <div className="p-3 bg-white/20 backdrop-blur-md rounded-full w-fit mb-4 text-white">
                                    {cat.icon}
                                </div>
                            </div>
                        </div>
                        <h3 className="text-2xl font-serif text-earth-900 mb-2 group-hover:text-earth-600 transition-colors">{cat.title}</h3>
                        <p className="text-stone-600 text-sm leading-relaxed">{cat.description}</p>
                    </Link>
                ))}
            </div>

            <div className="text-center mt-12">
                <Link to="/catalog" className="btn-secondary inline-block">
                    View Full Catalog
                </Link>
            </div>
        </section>
    );
};

export default Services;
