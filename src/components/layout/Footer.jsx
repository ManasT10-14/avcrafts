import React from 'react';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import Button from '../common/Button';

const Footer = () => {
    return (
        <footer className="bg-earth-900 text-earth-100 pt-20 pb-10">
            <div className="container mx-auto px-4 md:px-6">

                {/* Newsletter Section */}
                <div className="bg-terracotta-600 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 mb-16 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>

                    <div className="relative z-10 w-full lg:w-1/2">
                        <h3 className="text-3xl font-hand font-bold text-white mb-2">Join Our Craft Community</h3>
                        <p className="text-terracotta-100">Subscribe for exclusive designs, crafting tips, and 10% off your first order.</p>
                    </div>
                    <div className="relative z-10 w-full lg:w-auto flex-1 max-w-md flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="w-full px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:bg-white/20 transition-all font-sans"
                        />
                        <button className="px-8 py-3 bg-white text-terracotta-600 font-bold rounded-full hover:bg-earth-50 transition-colors shadow-lg whitespace-nowrap">
                            Subscribe
                        </button>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 border-b border-earth-800 pb-12">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-terracotta-500 flex items-center justify-center text-white font-hand font-bold text-lg">
                                AV
                            </div>
                            <span className="font-hand text-2xl font-bold text-earth-50">AVCrafts</span>
                        </div>
                        <p className="text-earth-300 text-sm leading-relaxed">
                            Bringing the warmth of handmade art into your life. Premium quality, sustainable materials, and endless creativity.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Mail].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-earth-800 flex items-center justify-center text-earth-300 hover:bg-terracotta-500 hover:text-white transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Shop</h4>
                        <ul className="space-y-3 text-earth-300 text-sm">
                            <li><a href="#" className="hover:text-terracotta-400 transition-colors">New Arrivals</a></li>
                            <li><a href="#" className="hover:text-terracotta-400 transition-colors">Best Sellers</a></li>
                            <li><a href="#" className="hover:text-terracotta-400 transition-colors">Custom Prints</a></li>
                            <li><a href="#" className="hover:text-terracotta-400 transition-colors">Gift Cards</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Support</h4>
                        <ul className="space-y-3 text-earth-300 text-sm">
                            <li><a href="#" className="hover:text-terracotta-400 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-terracotta-400 transition-colors">Shipping & Returns</a></li>
                            <li><a href="#" className="hover:text-terracotta-400 transition-colors">Track Order</a></li>
                            <li><a href="#" className="hover:text-terracotta-400 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-white mb-6">Contact</h4>
                        <ul className="space-y-3 text-earth-300 text-sm">
                            <li>123 Craft Avenue, Art City, AC 12345</li>
                            <li>hello@avcrafts.com</li>
                            <li>+1 (555) 123-4567</li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-earth-400">
                    <p>&copy; 2026 AVCrafts. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-earth-200">Privacy Policy</a>
                        <a href="#" className="hover:text-earth-200">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
