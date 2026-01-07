import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-earth-100 text-stone-700 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Column 1: Brand */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-earth-800 rounded-full text-white">
                                <Heart size={18} fill="currentColor" strokeWidth={1.5} />
                            </div>
                            <span className="text-2xl font-serif font-medium text-earth-900">AVCrafts</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Preserving your most cherished moments with elegance and care. Custom fridge magnets and magnetic frames designed to last a lifetime.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-earth-900 font-serif text-xl">Quick Links</h4>
                        <ul className="space-y-3 text-sm font-medium">
                            <li><Link to="/catalog" className="hover:text-earth-800 transition-colors">Catalog</Link></li>
                            <li><a href="/#gallery" className="hover:text-earth-800 transition-colors">Gallery</a></li>
                            <li><a href="/#about" className="hover:text-earth-800 transition-colors">About Us</a></li>
                            <li><Link to="/contact" className="hover:text-earth-800 transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Connect */}
                    <div className="space-y-6">
                        <h4 className="text-earth-900 font-serif text-xl">Stay Connected</h4>
                        <p className="text-sm">Follow us on social media for inspiration and updates.</p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white rounded-full text-earth-800 hover:bg-earth-800 hover:text-white transition-all duration-300 shadow-sm">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full text-earth-800 hover:bg-earth-800 hover:text-white transition-all duration-300 shadow-sm">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full text-earth-800 hover:bg-earth-800 hover:text-white transition-all duration-300 shadow-sm">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full text-earth-800 hover:bg-earth-800 hover:text-white transition-all duration-300 shadow-sm">
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-earth-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
                    <p>&copy; {new Date().getFullYear()} AVCrafts. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-earth-800">Privacy Policy</a>
                        <a href="#" className="hover:text-earth-800">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

