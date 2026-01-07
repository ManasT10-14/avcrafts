import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Check if already logged in
    useEffect(() => {
        const isAdmin = sessionStorage.getItem('isAdmin');
        if (isAdmin === 'true') {
            navigate('/admin/orders');
        }
    }, [navigate]);

    // Admin password (in production, this should be verified on server-side)
    const ADMIN_PASSWORD = 'avcrafts2024';

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simulate verification delay
        setTimeout(() => {
            if (password === ADMIN_PASSWORD) {
                sessionStorage.setItem('isAdmin', 'true');
                navigate('/admin/orders');
            } else {
                setError('Invalid password. Please try again.');
                setPassword('');
            }
            setLoading(false);
        }, 500);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-earth-50 flex items-center justify-center">
            <div className="w-full max-w-md mx-4">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-earth-100">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock size={28} className="text-earth-700" />
                        </div>
                        <h1 className="text-2xl font-serif font-bold text-earth-900">Admin Access</h1>
                        <p className="text-earth-500 text-sm mt-2">Enter the admin password to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-earth-700 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-terracotta-500 focus:border-transparent outline-none transition-all"
                                placeholder="Enter admin password"
                                required
                                autoFocus
                            />
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm text-center bg-red-50 py-2 px-4 rounded-lg">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !password}
                            className="w-full py-3 bg-earth-900 text-white rounded-lg font-medium hover:bg-earth-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Access Dashboard
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-xs text-earth-400 mt-6">
                        This area is restricted to authorized personnel only.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
