import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, CheckCircle, Truck, CreditCard, MapPin, Plus, Check } from 'lucide-react';
import api from '../utils/api';

// Address Form Component extracted to prevent re-rendering issues
const AddressForm = ({ formData, handleChange, errors }) => (
    <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Full Name *</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500 ${errors.name ? 'border-red-500' : 'border-earth-200'}`}
                    placeholder="John Doe"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Phone Number *</label>
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500 ${errors.phone ? 'border-red-500' : 'border-earth-200'}`}
                    placeholder="9876543210"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>
        </div>
        <div>
            <label className="block text-sm font-medium text-earth-700 mb-1">Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500"
                placeholder="john@example.com"
            />
        </div>
        <div>
            <label className="block text-sm font-medium text-earth-700 mb-1">Address *</label>
            <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500 ${errors.address ? 'border-red-500' : 'border-earth-200'}`}
                placeholder="House/Flat No., Street, Landmark..."
            />
            {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">City *</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500 ${errors.city ? 'border-red-500' : 'border-earth-200'}`}
                    placeholder="Mumbai"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">State *</label>
                <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500 ${errors.state ? 'border-red-500' : 'border-earth-200'}`}
                    placeholder="Maharashtra"
                />
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-earth-700 mb-1">Pincode *</label>
                <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-terracotta-500 ${errors.pincode ? 'border-red-500' : 'border-earth-200'}`}
                    placeholder="400001"
                />
                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
            </div>
        </div>
    </div>
);

const Checkout = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);
    const [loadingAddresses, setLoadingAddresses] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        paymentMethod: 'cod'
    });

    const [errors, setErrors] = useState({});

    // Fetch addresses for logged-in users
    useEffect(() => {
        if (isLoggedIn && user) {
            setLoadingAddresses(true);
            fetch(api.getAddresses(user.id))
                .then(res => res.json())
                .then(data => {
                    setAddresses(data);
                    // Auto-select default address
                    const defaultAddr = data.find(a => a.is_default);
                    if (defaultAddr) {
                        setSelectedAddressId(defaultAddr.id);
                    } else if (data.length > 0) {
                        setSelectedAddressId(data[0].id);
                    }
                })
                .catch(err => console.error('Error fetching addresses:', err))
                .finally(() => setLoadingAddresses(false));
        }
    }, [isLoggedIn, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        // If logged in and address selected, skip validation
        if (isLoggedIn && selectedAddressId && !showNewAddressForm) {
            return true;
        }

        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
        if (!/^\d{10}$/.test(formData.phone.trim())) newErrors.phone = 'Enter valid 10-digit phone';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.state.trim()) newErrors.state = 'State is required';
        if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
        if (!/^\d{6}$/.test(formData.pincode.trim())) newErrors.pincode = 'Enter valid 6-digit pincode';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const getSelectedAddress = () => {
        return addresses.find(a => a.id === selectedAddressId);
    };

    const handlePlaceOrder = async () => {
        if (!validate()) return;
        if (cartItems.length === 0) return;

        setLoading(true);

        try {
            // Get address details
            let orderAddress;
            if (isLoggedIn && selectedAddressId && !showNewAddressForm) {
                const addr = getSelectedAddress();
                orderAddress = {
                    customerName: addr.name,
                    email: user.email,
                    phone: addr.phone,
                    address: addr.address,
                    city: addr.city,
                    state: addr.state,
                    pincode: addr.pincode
                };
            } else {
                orderAddress = {
                    customerName: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    pincode: formData.pincode
                };
            }

            // Create order for each cart item
            for (const item of cartItems) {
                const orderData = {
                    productId: item.productId,
                    quantity: item.quantity,
                    shape: item.shape || '',
                    size: item.size || '',
                    color: item.color || '',
                    totalAmount: item.price * item.quantity,
                    ...orderAddress,
                    paymentMethod: formData.paymentMethod,
                    imageData: item.imageData || '',
                    customizationNote: `${item.name} - Shape: ${item.shape || 'N/A'}, Size: ${item.size || 'N/A'}, Color: ${item.color || 'N/A'}`,
                    imageRotation: item.imageRotation,
                    customizationDetails: item.customizationDetails
                };

                const res = await fetch(api.createOrder(), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderData)
                });

                if (!res.ok) throw new Error('Order failed');
                const data = await res.json();
                setOrderId(data.id);
            }

            // Save formData for confirmation display
            if (!isLoggedIn || showNewAddressForm) {
                // Keep formData as is
            } else {
                const addr = getSelectedAddress();
                setFormData(prev => ({
                    ...prev,
                    address: addr.address,
                    city: addr.city,
                    state: addr.state,
                    pincode: addr.pincode
                }));
            }

            setOrderPlaced(true);
            clearCart();
        } catch (err) {
            console.error('Order error:', err);
            alert('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (orderPlaced) {
        const addr = isLoggedIn && selectedAddressId && !showNewAddressForm ? getSelectedAddress() : formData;
        return (
            <div className="pt-32 pb-20 min-h-screen bg-earth-50">
                <div className="container mx-auto px-4 text-center max-w-lg">
                    <CheckCircle size={80} className="mx-auto mb-6 text-green-500" />
                    <h1 className="text-3xl font-serif text-earth-900 mb-4">Order Placed Successfully!</h1>
                    <p className="text-earth-600 mb-2">Your order ID is: <strong>#{orderId}</strong></p>
                    <p className="text-earth-500 mb-8">We'll start crafting your items right away. You'll receive updates on your registered phone number.</p>
                    <div className="bg-white p-6 rounded-xl border border-earth-100 mb-8">
                        <p className="text-sm text-earth-600"><strong>Payment:</strong> Cash on Delivery</p>
                        <p className="text-sm text-earth-600 mt-2"><strong>Delivery Address:</strong><br />{addr.address}, {addr.city}, {addr.state} - {addr.pincode}</p>
                    </div>
                    <Link to="/" className="btn-primary inline-block">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        navigate('/cart');
        return null;
    }

    return (
        <div className="pt-28 pb-20 min-h-screen bg-earth-50">
            <div className="container mx-auto px-4 md:px-8 max-w-5xl">
                <div className="mb-8">
                    <Link to="/cart" className="inline-flex items-center gap-2 text-earth-500 hover:text-earth-900 transition-colors text-sm uppercase tracking-wide font-medium mb-4">
                        <ArrowLeft size={16} /> Back to Cart
                    </Link>
                    <h1 className="text-4xl font-serif font-bold text-earth-900">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Address */}
                        <div className="bg-white rounded-xl border border-earth-100 p-6 shadow-sm">
                            <h2 className="font-serif text-xl text-earth-900 mb-4 flex items-center gap-2">
                                <Truck size={20} /> Shipping Address
                            </h2>

                            {isLoggedIn ? (
                                // Logged-in user: Show saved addresses
                                <div>
                                    {loadingAddresses ? (
                                        <div className="flex justify-center py-8">
                                            <div className="w-8 h-8 border-2 border-earth-300 border-t-earth-700 rounded-full animate-spin"></div>
                                        </div>
                                    ) : addresses.length > 0 && !showNewAddressForm ? (
                                        <div className="space-y-3">
                                            {addresses.map((addr) => (
                                                <label
                                                    key={addr.id}
                                                    className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${selectedAddressId === addr.id
                                                        ? 'border-terracotta-500 bg-terracotta-50'
                                                        : 'border-earth-200 hover:border-earth-300'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="selectedAddress"
                                                        checked={selectedAddressId === addr.id}
                                                        onChange={() => setSelectedAddressId(addr.id)}
                                                        className="w-5 h-5 text-terracotta-500 mt-1"
                                                    />
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-earth-900">{addr.name}</span>
                                                            {addr.is_default && (
                                                                <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                                    Default
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-earth-600 mt-1">{addr.phone}</p>
                                                        <p className="text-sm text-earth-500">
                                                            {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                                                        </p>
                                                    </div>
                                                    {selectedAddressId === addr.id && (
                                                        <Check size={20} className="text-terracotta-500" />
                                                    )}
                                                </label>
                                            ))}

                                            <button
                                                onClick={() => setShowNewAddressForm(true)}
                                                className="flex items-center gap-2 w-full p-4 border-2 border-dashed border-earth-300 rounded-lg text-earth-600 hover:border-earth-400 hover:text-earth-700 transition-colors"
                                            >
                                                <Plus size={20} />
                                                <span className="font-medium">Add a New Address</span>
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            {showNewAddressForm && addresses.length > 0 && (
                                                <button
                                                    onClick={() => setShowNewAddressForm(false)}
                                                    className="text-sm text-terracotta-600 hover:text-terracotta-700 mb-4"
                                                >
                                                    ← Back to saved addresses
                                                </button>
                                            )}
                                            <AddressForm formData={formData} handleChange={handleChange} errors={errors} />
                                        </div>
                                    )}
                                </div>
                            ) : (
                                // Guest user: Show form
                                <AddressForm formData={formData} handleChange={handleChange} errors={errors} />
                            )}
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-xl border border-earth-100 p-6 shadow-sm">
                            <h2 className="font-serif text-xl text-earth-900 mb-4 flex items-center gap-2">
                                <CreditCard size={20} /> Payment Method
                            </h2>
                            <div className="space-y-3">
                                <label className={`flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-terracotta-500 bg-terracotta-50' : 'border-earth-200 hover:border-earth-300'}`}>
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="cod"
                                        checked={formData.paymentMethod === 'cod'}
                                        onChange={handleChange}
                                        className="w-5 h-5 text-terracotta-500"
                                    />
                                    <div>
                                        <p className="font-medium text-earth-900">Cash on Delivery</p>
                                        <p className="text-sm text-earth-500">Pay when your order arrives</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-earth-100 p-6 shadow-sm sticky top-28">
                            <h2 className="font-serif text-xl text-earth-900 mb-4">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                {cartItems.map((item) => (
                                    <div key={item.cartId} className="flex gap-3">
                                        <div className="w-16 h-16 bg-earth-100 rounded-lg overflow-hidden shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-earth-900 line-clamp-1">{item.name}</p>
                                            <p className="text-xs text-earth-500">Qty: {item.quantity}</p>
                                            <p className="text-sm font-medium text-terracotta-600">₹{item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-earth-200 pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-earth-600">Subtotal</span>
                                    <span className="text-earth-900">₹{getCartTotal()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-earth-600">Shipping</span>
                                    <span className="text-green-600">FREE</span>
                                </div>
                                <div className="flex justify-between text-lg font-semibold pt-2 border-t border-earth-200">
                                    <span className="text-earth-900">Total</span>
                                    <span className="text-earth-900">₹{getCartTotal()}</span>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                disabled={loading || (isLoggedIn && !selectedAddressId && !showNewAddressForm)}
                                className="w-full mt-6 py-4 bg-earth-900 text-white rounded-full font-medium uppercase tracking-wide hover:bg-earth-800 transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Placing Order...' : 'Place Order (COD)'}
                            </button>

                            {!isLoggedIn && (
                                <p className="text-center text-sm text-earth-500 mt-4">
                                    <Link to="/login" state={{ from: '/checkout' }} className="text-terracotta-600 hover:text-terracotta-700">
                                        Sign in
                                    </Link> for faster checkout with saved addresses
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

