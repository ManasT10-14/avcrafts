import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-terracotta-500 flex items-center justify-center text-white font-hand font-bold text-lg group-hover:scale-110 transition-transform">
                        AV
                    </div>
                    <span className="font-hand text-2xl font-bold text-earth-900">AVCrafts</span>
                </a>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {['Home', 'Shop', 'Custom Prints', 'About', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-earth-800 hover:text-terracotta-600 font-medium transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Icons */}
                <div className="hidden md:flex items-center gap-4">
                    <button className="p-2 hover:bg-earth-100 rounded-full transition-colors text-earth-800">
                        <Search size={20} />
                    </button>
                    <button className="p-2 hover:bg-earth-100 rounded-full transition-colors text-earth-800 relative">
                        <ShoppingBag size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-terracotta-500 rounded-full"></span>
                    </button>
                    <button className="btn-primary text-sm px-5 py-2">
                        Sign In
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-earth-900"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-earth-100 shadow-xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-2">
                    {['Home', 'Shop', 'Custom Prints', 'About', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="px-4 py-2 hover:bg-earth-50 rounded-lg text-earth-800 font-medium"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                    <div className="h-px bg-earth-100 my-2"></div>
                    <button className="btn-primary w-full justify-center">Sign In</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
