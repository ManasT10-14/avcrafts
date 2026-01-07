import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, MapPin, Plus, Edit2, Trash2, Check, X, User, Phone, LogOut } from 'lucide-react';

const Profile = () => {
    const { user, isLoggedIn, logout, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: ''
    });
    const [saving, setSaving] = useState(false);

    // Redirect if not logged in
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login', { state: { from: '/profile' } });
        }
    }, [isLoggedIn, navigate]);

    // Fetch addresses
    useEffect(() => {
        if (user) {
            fetchAddresses();
        }
    }, [user]);

    const fetchAddresses = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/addresses/${user.id}`);
            const data = await res.json();
            setAddresses(data);
        } catch (err) {
            console.error('Error fetching addresses:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setFormData({ name: '', phone: '', address: '', city: '', state: '', pincode: '' });
        setShowAddForm(false);
        setEditingId(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const url = editingId
                ? `http://localhost:5000/api/addresses/${editingId}`
                : 'http://localhost:5000/api/addresses';

            const method = editingId ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    userId: user.id
                })
            });

            if (res.ok) {
                await fetchAddresses();
                resetForm();
            }
        } catch (err) {
            console.error('Error saving address:', err);
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (addr) => {
        setFormData({
            name: addr.name,
            phone: addr.phone,
            address: addr.address,
            city: addr.city,
            state: addr.state,
            pincode: addr.pincode
        });
        setEditingId(addr.id);
        setShowAddForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this address?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/addresses/${id}`, {
                method: 'DELETE'
            });
            if (res.ok) {
                await fetchAddresses();
            }
        } catch (err) {
            console.error('Error deleting address:', err);
        }
    };

    const handleSetDefault = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/addresses/${id}/default`, {
                method: 'PUT'
            });
            if (res.ok) {
                await fetchAddresses();
            }
        } catch (err) {
            console.error('Error setting default:', err);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!isLoggedIn) return null;

    return (
        <div className="min-h-screen pt-24 pb-20 bg-earth-50">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-earth-500 hover:text-earth-900 transition-colors text-sm uppercase tracking-wide font-medium mb-4"
                    >
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-serif font-bold text-earth-900">My Profile</h1>
                            <p className="text-earth-600 mt-2">Manage your account and addresses</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-earth-100 text-earth-700 rounded-lg hover:bg-earth-200 transition-colors self-start"
                        >
                            <LogOut size={18} />
                            Logout
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* User Info Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-earth-100 p-6 shadow-sm">
                            <div className="text-center mb-6">
                                {user.picture ? (
                                    <img
                                        src={user.picture}
                                        alt={user.name}
                                        className="w-24 h-24 rounded-full mx-auto border-4 border-earth-100"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full mx-auto bg-earth-100 flex items-center justify-center">
                                        <User size={40} className="text-earth-400" />
                                    </div>
                                )}
                                <h2 className="text-xl font-medium text-earth-900 mt-4">{user.name}</h2>
                                <p className="text-earth-500 text-sm">{user.email}</p>
                            </div>

                            {user.phone && (
                                <div className="flex items-center gap-3 text-earth-600 text-sm border-t border-earth-100 pt-4">
                                    <Phone size={16} />
                                    <span>{user.phone}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Addresses */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-earth-100 shadow-sm">
                            <div className="p-6 border-b border-earth-100 flex items-center justify-between">
                                <h2 className="text-xl font-serif font-bold text-earth-900">
                                    My Addresses
                                </h2>
                                {!showAddForm && (
                                    <button
                                        onClick={() => setShowAddForm(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-terracotta-500 text-white rounded-lg hover:bg-terracotta-600 transition-colors text-sm font-medium"
                                    >
                                        <Plus size={18} />
                                        Add Address
                                    </button>
                                )}
                            </div>

                            {/* Add/Edit Form */}
                            {showAddForm && (
                                <div className="p-6 border-b border-earth-100 bg-earth-50">
                                    <h3 className="text-lg font-medium text-earth-900 mb-4">
                                        {editingId ? 'Edit Address' : 'Add New Address'}
                                    </h3>
                                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-earth-700 mb-1">
                                                Full Name *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-earth-200 rounded-lg focus:ring-2 focus:ring-terracotta-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-earth-700 mb-1">
                                                Phone *
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-earth-200 rounded-lg focus:ring-2 focus:ring-terracotta-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-earth-700 mb-1">
                                                Address *
                                            </label>
                                            <textarea
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                required
                                                rows={2}
                                                className="w-full px-4 py-2 border border-earth-200 rounded-lg focus:ring-2 focus:ring-terracotta-500 focus:border-transparent outline-none resize-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-earth-700 mb-1">
                                                City *
                                            </label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-earth-200 rounded-lg focus:ring-2 focus:ring-terracotta-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-earth-700 mb-1">
                                                State *
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                required
                                                className="w-full px-4 py-2 border border-earth-200 rounded-lg focus:ring-2 focus:ring-terracotta-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-earth-700 mb-1">
                                                Pincode *
                                            </label>
                                            <input
                                                type="text"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleInputChange}
                                                required
                                                pattern="[0-9]{6}"
                                                className="w-full px-4 py-2 border border-earth-200 rounded-lg focus:ring-2 focus:ring-terracotta-500 focus:border-transparent outline-none"
                                            />
                                        </div>
                                        <div className="md:col-span-2 flex gap-3 justify-end mt-2">
                                            <button
                                                type="button"
                                                onClick={resetForm}
                                                className="px-4 py-2 text-earth-600 hover:text-earth-800 font-medium"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={saving}
                                                className="px-6 py-2 bg-earth-900 text-white rounded-lg hover:bg-earth-800 transition-colors font-medium disabled:opacity-50"
                                            >
                                                {saving ? 'Saving...' : (editingId ? 'Update' : 'Save Address')}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Address List */}
                            <div className="divide-y divide-earth-100">
                                {loading ? (
                                    <div className="p-8 text-center">
                                        <div className="w-8 h-8 border-2 border-earth-300 border-t-earth-700 rounded-full animate-spin mx-auto"></div>
                                    </div>
                                ) : addresses.length === 0 ? (
                                    <div className="p-8 text-center text-earth-500">
                                        <MapPin size={40} className="mx-auto mb-3 opacity-50" />
                                        <p>No addresses saved yet.</p>
                                        <p className="text-sm">Add an address for faster checkout.</p>
                                    </div>
                                ) : (
                                    addresses.map((addr) => (
                                        <div key={addr.id} className="p-6 hover:bg-earth-50 transition-colors">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-medium text-earth-900">{addr.name}</span>
                                                        {addr.is_default && (
                                                            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                                Default
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-earth-600">{addr.phone}</p>
                                                    <p className="text-sm text-earth-600 mt-1">
                                                        {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {!addr.is_default && (
                                                        <button
                                                            onClick={() => handleSetDefault(addr.id)}
                                                            className="p-2 text-earth-400 hover:text-green-600 transition-colors"
                                                            title="Set as default"
                                                        >
                                                            <Check size={18} />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleEdit(addr)}
                                                        className="p-2 text-earth-400 hover:text-blue-600 transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(addr.id)}
                                                        className="p-2 text-earth-400 hover:text-red-600 transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
