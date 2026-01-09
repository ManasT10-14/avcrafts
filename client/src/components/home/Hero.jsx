import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/images/hero-bg.png"
                    alt="Cozy living room with gallery wall"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-stone-900/20 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-earth-50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-16 text-center pt-20">
                <span className="inline-block py-1 px-3 border border-white/60 rounded-full text-white text-xs tracking-widest uppercase mb-6 backdrop-blur-sm">
                    Est. 2026
                </span>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight drop-shadow-sm">
                    Framing Life's <br />
                    <span className="italic">Beautiful Moments</span>
                </h1>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                    Welcome to AVCrafts. We craft timeless frames and custom fridge magnets that turn your most cherished memories into lasting art.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/catalog" className="px-8 py-3 bg-white text-earth-900 rounded-md hover:bg-earth-100 transition-all duration-300 font-medium tracking-wide uppercase text-sm shadow-lg">
                        Shop Catalog
                    </Link>
                    <Link to="/contact" className="px-8 py-3 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-earth-900 transition-all duration-300 font-medium tracking-wide uppercase text-sm backdrop-blur-sm">
                        Custom Orders
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;
