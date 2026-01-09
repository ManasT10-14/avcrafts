import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Eye, X, MapPin, Phone, Mail, ChevronDown, LogOut, Clock, CheckCircle, Palette, Truck, PackageCheck, XCircle, RotateCw, ZoomIn, Layout } from 'lucide-react';
import api from '../utils/api';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [activeFilter, setActiveFilter] = useState('all');
    const navigate = useNavigate();

    const statuses = ['pending', 'confirmed', 'crafting', 'shipped', 'delivered', 'cancelled'];

    const filterTabs = [
        { id: 'all', label: 'All Orders', icon: Package },
        { id: 'pending', label: 'Pending', icon: Clock },
        { id: 'confirmed', label: 'Confirmed', icon: CheckCircle },
        { id: 'crafting', label: 'Crafting', icon: Palette },
        { id: 'shipped', label: 'Shipped', icon: Truck },
        { id: 'delivered', label: 'Delivered', icon: PackageCheck },
        { id: 'cancelled', label: 'Cancelled', icon: XCircle },
    ];

    // Get filtered orders
    const filteredOrders = activeFilter === 'all'
        ? orders
        : orders.filter(o => o.status === activeFilter);

    // Get count for each status
    const getStatusCount = (status) => {
        if (status === 'all') return orders.length;
        return orders.filter(o => o.status === status).length;
    };

    // Check authentication
    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (isAdmin !== 'true') {
            navigate('/admin');
        }
    }, [navigate]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        fetch(api.getAdminOrders())
            .then(res => res.json())
            .then(data => {
                setOrders(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching orders:', err);
                setLoading(false);
            });
    };

    const updateStatus = async (orderId, newStatus) => {
        try {
            const res = await fetch(api.updateOrderStatus(orderId), {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
                if (selectedOrder && selectedOrder.id === orderId) {
                    setSelectedOrder({ ...selectedOrder, status: newStatus });
                }
            }
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isAdmin');
        navigate('/admin');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'confirmed': return 'bg-blue-100 text-blue-800';
            case 'crafting': return 'bg-indigo-100 text-indigo-800';
            case 'shipped': return 'bg-purple-100 text-purple-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="pt-24 pb-20 min-h-screen bg-earth-50">
            <div className="container mx-auto px-4 md:px-8">
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <Link to="/" className="inline-flex items-center gap-2 text-earth-500 hover:text-earth-900 transition-colors text-sm uppercase tracking-wide font-medium mb-4">
                            <ArrowLeft size={16} /> Back to Home
                        </Link>
                        <h1 className="text-4xl font-serif font-bold text-earth-900">Admin - Orders</h1>
                        <p className="text-earth-600 mt-2">View and manage all customer orders.</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-earth-100 text-earth-700 rounded-lg hover:bg-earth-200 transition-colors self-start"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-terracotta-500"></div>
                    </div>
                ) : (
                    <>
                        {/* Filter Tabs */}
                        <div className="mb-6 overflow-x-auto">
                            <div className="flex gap-2 min-w-max">
                                {filterTabs.map((tab) => {
                                    const Icon = tab.icon;
                                    const count = getStatusCount(tab.id);
                                    const isActive = activeFilter === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveFilter(tab.id)}
                                            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${isActive
                                                ? 'bg-earth-900 text-white shadow-md'
                                                : 'bg-white text-earth-600 hover:bg-earth-100 border border-earth-200'
                                                }`}
                                        >
                                            <Icon size={16} />
                                            <span>{tab.label}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-white/20 text-white' : 'bg-earth-100 text-earth-600'
                                                }`}>
                                                {count}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {filteredOrders.length === 0 ? (
                            <div className="text-center py-20 text-earth-500 bg-white rounded-xl border border-earth-100">
                                <Package size={48} className="mx-auto mb-4 opacity-50" />
                                <p className="text-lg">No {activeFilter === 'all' ? '' : activeFilter} orders found.</p>
                            </div>
                        ) : (
                            <div className="bg-white rounded-xl border border-earth-100 overflow-hidden shadow-sm overflow-x-auto">
                                <table className="w-full min-w-[900px]">
                                    <thead className="bg-earth-100">
                                        <tr>
                                            <th className="text-left py-4 px-4 text-xs uppercase tracking-wide text-earth-600 font-semibold">Order</th>
                                            <th className="text-left py-4 px-4 text-xs uppercase tracking-wide text-earth-600 font-semibold">Product</th>
                                            <th className="text-left py-4 px-4 text-xs uppercase tracking-wide text-earth-600 font-semibold">Customer</th>
                                            <th className="text-left py-4 px-4 text-xs uppercase tracking-wide text-earth-600 font-semibold">Amount</th>
                                            <th className="text-left py-4 px-4 text-xs uppercase tracking-wide text-earth-600 font-semibold">Status</th>
                                            <th className="text-left py-4 px-4 text-xs uppercase tracking-wide text-earth-600 font-semibold">Date</th>
                                            <th className="text-left py-4 px-4 text-xs uppercase tracking-wide text-earth-600 font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredOrders.map((order) => (
                                            <tr key={order.id} className="border-t border-earth-100 hover:bg-earth-50 transition-colors">
                                                <td className="py-4 px-4 font-medium text-earth-900">#{order.id}</td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-3">
                                                        {order.product_image && (
                                                            <img src={order.product_image} alt="" className="w-10 h-10 rounded object-cover" />
                                                        )}
                                                        <div>
                                                            <p className="text-sm font-medium text-earth-900">{order.product_name || 'N/A'}</p>
                                                            <p className="text-xs text-earth-500">Qty: {order.quantity || 1}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <p className="text-sm font-medium text-earth-900">{order.customer_name || 'Guest'}</p>
                                                    <p className="text-xs text-earth-500">{order.city || 'N/A'}</p>
                                                </td>
                                                <td className="py-4 px-4 font-semibold text-earth-900">₹{order.total_amount}</td>
                                                <td className="py-4 px-4">
                                                    <div className="relative">
                                                        <select
                                                            value={order.status || 'pending'}
                                                            onChange={(e) => updateStatus(order.id, e.target.value)}
                                                            className={`appearance-none pr-8 pl-3 py-1.5 rounded-full text-xs font-medium cursor-pointer border-0 ${getStatusColor(order.status || 'pending')}`}
                                                        >
                                                            {statuses.map(s => (
                                                                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                                            ))}
                                                        </select>
                                                        <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4 text-sm text-earth-500">{new Date(order.created_at).toLocaleDateString()}</td>
                                                <td className="py-4 px-4">
                                                    <button
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="flex items-center gap-1 text-terracotta-600 hover:text-terracotta-700 text-sm font-medium"
                                                    >
                                                        <Eye size={16} /> View
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}
                {/* Order Detail Modal */}
                {selectedOrder && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
                        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                            <div className="p-6 border-b border-earth-100 flex items-center justify-between">
                                <h2 className="text-xl font-serif font-bold text-earth-900">Order #{selectedOrder.id}</h2>
                                <button onClick={() => setSelectedOrder(null)} className="text-earth-400 hover:text-earth-900">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="p-6 space-y-6">
                                {/* Status Update */}
                                <div className="flex items-center gap-4 p-4 bg-earth-50 rounded-lg">
                                    <span className="text-sm font-medium text-earth-700">Update Status:</span>
                                    <select
                                        value={selectedOrder.status || 'pending'}
                                        onChange={(e) => updateStatus(selectedOrder.id, e.target.value)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer ${getStatusColor(selectedOrder.status || 'pending')}`}
                                    >
                                        {statuses.map(s => (
                                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Product Info */}
                                <div className="flex gap-4">
                                    {selectedOrder.product_image && (
                                        <img src={selectedOrder.product_image} alt="" className="w-20 h-20 rounded-lg object-cover" />
                                    )}
                                    <div>
                                        <h3 className="font-medium text-earth-900">{selectedOrder.product_name}</h3>
                                        <p className="text-sm text-earth-500">
                                            {selectedOrder.shape && `Shape: ${selectedOrder.shape}`}
                                            {selectedOrder.size && ` • Size: ${selectedOrder.size}`}
                                            {selectedOrder.color && ` • Color: ${selectedOrder.color}`}
                                        </p>
                                        <p className="text-sm text-earth-500">Quantity: {selectedOrder.quantity || 1}</p>
                                        <p className="text-lg font-semibold text-earth-900 mt-2">₹{selectedOrder.total_amount}</p>
                                    </div>
                                </div>

                                {/* Customer Uploaded Image */}
                                {selectedOrder.image_data && (
                                    <div>
                                        <h4 className="text-sm font-medium text-earth-900 mb-2">Customer Design</h4>
                                        <div className="inline-block p-4 border border-earth-200 rounded-lg bg-earth-50 relative">
                                            <div className="overflow-hidden bg-white shadow-sm rounded border border-earth-100 flex items-center justify-center p-2" style={{ width: 'fit-content' }}>
                                                <img
                                                    src={selectedOrder.image_data}
                                                    alt="Customer upload"
                                                    className="max-w-full max-h-64 rounded origin-center"
                                                    style={{
                                                        transform: `rotate(${selectedOrder.customization_details?.rotation || selectedOrder.image_rotation || 0}deg) scale(${selectedOrder.customization_details?.scale || 1})`
                                                    }}
                                                />
                                            </div>

                                            {selectedOrder.customization_details?.frameRotated && (
                                                <div className="absolute top-2 right-2 px-2 py-1 bg-terracotta-500 text-white text-[10px] uppercase font-bold rounded shadow-sm flex items-center gap-1">
                                                    <Layout size={10} /> Frame Flipped
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-2 flex flex-wrap gap-2 text-xs text-earth-600">
                                            {(selectedOrder.customization_details?.rotation || selectedOrder.image_rotation) && (
                                                <span className="px-2 py-1 bg-earth-100 rounded flex items-center gap-1">
                                                    <RotateCw size={10} /> Img Rotation: {selectedOrder.customization_details?.rotation || selectedOrder.image_rotation}°
                                                </span>
                                            )}
                                            {selectedOrder.customization_details?.scale && selectedOrder.customization_details.scale !== 1 && (
                                                <span className="px-2 py-1 bg-earth-100 rounded flex items-center gap-1">
                                                    <ZoomIn size={10} /> Zoom: {Math.round(selectedOrder.customization_details.scale * 100)}%
                                                </span>
                                            )}
                                            {selectedOrder.customization_details?.frameRotated && (
                                                <span className="px-2 py-1 bg-earth-100 rounded flex items-center gap-1">
                                                    <Layout size={10} /> Frame Orientation: Flipped
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Customer Info */}
                                <div className="bg-earth-50 p-4 rounded-lg">
                                    <h4 className="text-sm font-medium text-earth-900 mb-3">Customer Details</h4>
                                    <div className="space-y-2 text-sm">
                                        <p className="font-medium text-earth-700">{selectedOrder.customer_name || 'Guest'}</p>
                                        {selectedOrder.phone && (
                                            <p className="flex items-center gap-2 text-earth-600">
                                                <Phone size={14} /> {selectedOrder.phone}
                                            </p>
                                        )}
                                        {selectedOrder.email && (
                                            <p className="flex items-center gap-2 text-earth-600">
                                                <Mail size={14} /> {selectedOrder.email}
                                            </p>
                                        )}
                                        {selectedOrder.address && (
                                            <p className="flex items-start gap-2 text-earth-600">
                                                <MapPin size={14} className="shrink-0 mt-0.5" />
                                                <span>{selectedOrder.address}, {selectedOrder.city}, {selectedOrder.state} - {selectedOrder.pincode}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Payment */}
                                <div className="bg-earth-50 p-4 rounded-lg">
                                    <p className="text-xs text-earth-500 uppercase tracking-wide">Payment</p>
                                    <p className="font-medium text-earth-900 mt-1">{selectedOrder.payment_method === 'cod' ? 'Cash on Delivery' : selectedOrder.payment_method}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOrders;

