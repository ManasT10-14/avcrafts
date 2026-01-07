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
                            Premium Handcrafted Goods
                        </span>
                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-earth-900 font-hand">
                            Handcrafted with Heart, <br />
                            <span className="text-terracotta-500">Designed for You.</span>
                        </h1>
                        <p className="text-lg text-earth-700 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Discover a unique collection of personalized gifts, custom art, and eco-friendly crafts that tell a story. Made by artists, cherished by you.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                            <Button variant="primary" className="w-full sm:w-auto">
                                Shop Collection
                            </Button>
                            <Button variant="outline" className="w-full sm:w-auto">
                                Customize Yours
                            </Button>
                        </div>

                        {/* Social Proof */}
                        <div className="pt-8 flex items-center justify-center lg:justify-start gap-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-earth-50 bg-earth-200"></div>
                                ))}
                            </div>
                            <div className="text-sm text-earth-600">
                                <span className="font-bold text-earth-900">1,000+</span> happy customers
                            </div>
                        </div>
                    </div>

                    {/* Hero Image / Visual */}
                    <div className="flex-1 relative">
                        <div className="relative z-10 grid grid-cols-2 gap-4">
                            <div className="space-y-4 translate-y-8">
                                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-earth-200 shadow-xl">
                                    <img src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600" alt="Craft 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="aspect-square rounded-2xl overflow-hidden bg-earth-200 shadow-xl">
                                    <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=600" alt="Craft 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="aspect-square rounded-2xl overflow-hidden bg-earth-200 shadow-xl">
                                    <img src="https://images.unsplash.com/photo-1499750310159-5b600gy99298?auto=format&fit=crop&q=80&w=600" alt="Craft 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-earth-200 shadow-xl">
                                    <img src="https://images.unsplash.com/photo-1605218427339-9d9987d6d396?auto=format&fit=crop&q=80&w=600" alt="Craft 4" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                            </div>
                        </div>
                        {/* Organic Shape Behind */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/50 blur-3xl rounded-full -z-10"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
