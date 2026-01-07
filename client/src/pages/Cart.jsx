import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="pt-32 pb-20 min-h-screen bg-earth-50">
                <div className="container mx-auto px-4 text-center">
                    <ShoppingBag size={64} className="mx-auto mb-6 text-earth-300" />
                    <h1 className="text-3xl font-serif text-earth-900 mb-4">Your Cart is Empty</h1>
                    <p className="text-earth-600 mb-8">Add some handcrafted items to get started!</p>
                    <Link to="/catalog" className="btn-primary inline-block">
                        Browse Catalog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-28 pb-20 min-h-screen bg-earth-50">
            <div className="container mx-auto px-4 md:px-8 max-w-4xl">
                <div className="mb-8">
                    <Link to="/catalog" className="inline-flex items-center gap-2 text-earth-500 hover:text-earth-900 transition-colors text-sm uppercase tracking-wide font-medium mb-4">
                        <ArrowLeft size={16} /> Continue Shopping
                    </Link>
                    <h1 className="text-4xl font-serif font-bold text-earth-900">Your Cart</h1>
                </div>

                <div className="bg-white rounded-xl border border-earth-100 overflow-hidden shadow-sm">
                    {cartItems.map((item) => (
                        <div key={item.cartId} className="flex items-center gap-6 p-6 border-b border-earth-100 last:border-b-0">
                            {/* Image */}
                            <div className="w-24 h-24 bg-earth-100 rounded-lg overflow-hidden shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Details */}
                            <div className="flex-1">
                                <h3 className="font-serif text-lg text-earth-900 mb-1">{item.name}</h3>
                                <p className="text-sm text-earth-500">
                                    {item.shape && `Shape: ${item.shape}`}
                                    {item.size && ` • Size: ${item.size}`}
                                    {item.color && ` • Color: ${item.color}`}
                                </p>
                                <p className="text-sm text-terracotta-600 font-medium mt-1">₹{item.price}</p>
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center border border-earth-200 rounded-md">
                                <button
                                    onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                    className="p-2 text-earth-600 hover:bg-earth-50"
                                >
                                    <Minus size={14} />
                                </button>
                                <span className="px-3 font-medium text-earth-900">{item.quantity}</span>
                                <button
                                    onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                    className="p-2 text-earth-600 hover:bg-earth-50"
                                >
                                    <Plus size={14} />
                                </button>
                            </div>

                            {/* Subtotal */}
                            <div className="text-right w-24">
                                <p className="font-semibold text-earth-900">₹{item.price * item.quantity}</p>
                            </div>

                            {/* Remove */}
                            <button
                                onClick={() => removeFromCart(item.cartId)}
                                className="text-earth-400 hover:text-red-500 transition-colors"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="mt-8 bg-white rounded-xl border border-earth-100 p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <span className="text-lg text-earth-600">Subtotal</span>
                        <span className="text-2xl font-semibold text-earth-900">₹{getCartTotal()}</span>
                    </div>
                    <p className="text-sm text-earth-500 mb-6">Shipping & taxes calculated at checkout.</p>
                    <button
                        onClick={() => navigate('/checkout')}
                        className="w-full py-4 bg-earth-900 text-white rounded-full font-medium uppercase tracking-wide hover:bg-earth-800 transition-colors"
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
