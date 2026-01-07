import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, LogOut, ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { getCartCount } = useCart();
    const { user, isLoggedIn, logout } = useAuth();
    const cartCount = getCartCount();
    const userMenuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        setShowUserMenu(false);
    }, [location]);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Catalog', path: '/catalog' },
        { name: 'Contact', path: '/contact' },
    ];

    const textColor = scrolled ? 'text-earth-800' : 'text-earth-900';
    const iconColor = scrolled ? 'text-earth-700' : 'text-earth-800';

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
        navigate('/');
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-white/80 backdrop-blur-sm py-4'}`}>
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-serif font-bold text-earth-900 tracking-wide">
                        AVCrafts
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-medium tracking-wide uppercase transition-colors ${location.pathname === link.path
                                    ? 'text-terracotta-600'
                                    : `${textColor} hover:text-terracotta-600`
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* User Menu */}
                        <div className="relative" ref={userMenuRef}>
                            {isLoggedIn ? (
                                <>
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 py-1 px-2 rounded-full hover:bg-earth-100 transition-colors"
                                    >
                                        {user.picture ? (
                                            <img
                                                src={user.picture}
                                                alt={user.name}
                                                className="w-8 h-8 rounded-full border-2 border-earth-200"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-terracotta-100 flex items-center justify-center">
                                                <User size={16} className="text-terracotta-600" />
                                            </div>
                                        )}
                                        <span className={`text-sm font-medium ${textColor} hidden lg:block`}>
                                            {user.name?.split(' ')[0]}
                                        </span>
                                        <ChevronDown size={16} className={iconColor} />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {showUserMenu && (
                                        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-earth-100 py-2 animate-fade-in">
                                            <div className="px-4 py-2 border-b border-earth-100">
                                                <p className="font-medium text-earth-900 truncate">{user.name}</p>
                                                <p className="text-xs text-earth-500 truncate">{user.email}</p>
                                            </div>
                                            <Link
                                                to="/profile"
                                                className="block px-4 py-2 text-sm text-earth-700 hover:bg-earth-50 transition-colors"
                                            >
                                                My Profile
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left px-4 py-2 text-sm text-earth-700 hover:bg-earth-50 transition-colors flex items-center gap-2"
                                            >
                                                <LogOut size={16} />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    className={`flex items-center gap-2 p-2 ${iconColor} hover:text-terracotta-600 transition-colors`}
                                >
                                    <User size={20} />
                                    <span className="text-sm font-medium hidden lg:block">Login</span>
                                </Link>
                            )}
                        </div>

                        {/* Cart */}
                        <Link to="/cart" className={`p-2 ${iconColor} hover:text-terracotta-600 transition-colors relative`}>
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-terracotta-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartCount > 9 ? '9+' : cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
                        <Link to="/cart" className="p-2 text-earth-800 relative">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-terracotta-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartCount > 9 ? '9+' : cartCount}
                                </span>
                            )}
                        </Link>
                        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-earth-900">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 border-t border-earth-100">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`block py-3 text-sm font-medium tracking-wide uppercase ${location.pathname === link.path
                                    ? 'text-terracotta-600'
                                    : 'text-earth-800'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Mobile User Section */}
                        <div className="pt-4 border-t border-earth-100 mt-4">
                            {isLoggedIn ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 py-2">
                                        {user.picture ? (
                                            <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-terracotta-100 flex items-center justify-center">
                                                <User size={20} className="text-terracotta-600" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-medium text-earth-900">{user.name}</p>
                                            <p className="text-xs text-earth-500">{user.email}</p>
                                        </div>
                                    </div>
                                    <Link
                                        to="/profile"
                                        className="block py-2 text-sm text-earth-700 font-medium"
                                    >
                                        My Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-2 py-2 text-sm text-earth-700 font-medium"
                                    >
                                        <LogOut size={16} />
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <Link
                                    to="/login"
                                    className="flex items-center gap-2 py-2 text-sm text-earth-800 font-medium"
                                >
                                    <User size={20} />
                                    Login / Sign Up
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;


