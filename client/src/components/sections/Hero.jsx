import React from 'react';
import Button from '../common/Button';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-terracotta-500/10 rounded-l-full blur-3xl -z-10"></div>
            <div className="absolute bottom-0 left-0 w-1/4 h-2/3 bg-olive-500/10 rounded-r-full blur-3xl -z-10"></div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left space-y-6">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-terracotta-100 text-terracotta-700 font-medium text-sm tracking-wide uppercase animate-fade-in">
                            Made to Order, Just for You
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-earth-900 font-hand">
                            Crafted <span className="text-terracotta-600">After</span> You Order. <br />
                            <span className="text-4xl lg:text-6xl text-earth-600">No Warehouses. No Waste.</span>
                        </h1>
                        <p className="text-lg text-earth-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Experience the joy of true craftsmanship. Every piece is handmade exclusively for you once you place your order.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                            <Button variant="primary" className="w-full sm:w-auto">
                                Explore Shop
                            </Button>
                            <Button variant="outline" className="w-full sm:w-auto">
                                How It Works
                            </Button>
                        </div>
                    </div>

                    {/* Hero Image / Visual */}
                    <div className="flex-1 relative">
                        <div className="relative z-10 aspect-square bg-earth-200 rounded-full overflow-hidden shadow-2xl border-8 border-white">
                            <img src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=800" alt="Artisan working" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                        </div>
                        {/* Note badge */}
                        <div className="absolute bottom-10 -left-10 bg-white p-4 rounded-xl shadow-lg max-w-xs transform rotate-3 hidden md:block">
                            <p className="font-hand text-xl text-terracotta-600 mb-1">Did you know?</p>
                            <p className="text-sm text-earth-600">Your item doesn't exist yet. We start crafting the moment you click 'Buy'.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
