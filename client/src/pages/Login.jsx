import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Mail, ShieldCheck } from 'lucide-react';

const Login = () => {
    const { loginWithGoogle, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const from = location.state?.from || '/';

    // Redirect if already logged in
    useEffect(() => {
        if (isLoggedIn) {
            navigate(from, { replace: true });
        }
    }, [isLoggedIn, navigate, from]);

    // Initialize Google Sign-In
    useEffect(() => {
        const initGoogle = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID || 'YOUR_GOOGLE_CLIENT_ID',
                    callback: handleGoogleCallback,
                    auto_select: false,
                });

                window.google.accounts.id.renderButton(
                    document.getElementById('google-signin-button'),
                    {
                        theme: 'outline',
                        size: 'large',
                        width: '100%',
                        text: 'continue_with',
                        shape: 'rectangular',
                    }
                );
            }
        };

        // Load Google Identity Services script
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = initGoogle;
        document.body.appendChild(script);

        return () => {
            // Cleanup
            const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, []);

    const handleGoogleCallback = async (response) => {
        setLoading(true);
        setError('');

        try {
            // Decode JWT token from Google
            const payload = JSON.parse(atob(response.credential.split('.')[1]));
            await loginWithGoogle(payload);
            navigate(from, { replace: true });
        } catch (err) {
            setError('Login failed. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleContinueAsGuest = () => {
        navigate(from, { replace: true });
    };

    return (
        <div className="min-h-screen pt-24 pb-20 bg-earth-50">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                    {/* Back Link */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-earth-500 hover:text-earth-900 transition-colors text-sm uppercase tracking-wide font-medium mb-8"
                    >
                        <ArrowLeft size={16} /> Back to Home
                    </Link>

                    {/* Login Card */}
                    <div className="bg-white rounded-2xl shadow-lg border border-earth-100 overflow-hidden">
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-serif font-bold text-earth-900 mb-2">
                                    Welcome to AVCrafts
                                </h1>
                                <p className="text-earth-500">
                                    Sign in to manage your orders and saved addresses
                                </p>
                            </div>

                            {error && (
                                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg text-sm text-center">
                                    {error}
                                </div>
                            )}

                            {/* Google Sign-In Button */}
                            <div className="mb-6">
                                <div
                                    id="google-signin-button"
                                    className="flex justify-center"
                                    style={{ minHeight: '44px' }}
                                ></div>
                                {loading && (
                                    <div className="flex justify-center mt-4">
                                        <div className="w-6 h-6 border-2 border-earth-300 border-t-earth-700 rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>

                            {/* Divider */}
                            <div className="relative my-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-earth-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-earth-400">or</span>
                                </div>
                            </div>

                            {/* Continue as Guest */}
                            <button
                                onClick={handleContinueAsGuest}
                                className="w-full py-3 border-2 border-earth-200 text-earth-700 rounded-lg font-medium hover:bg-earth-50 transition-colors"
                            >
                                Continue as Guest
                            </button>
                        </div>

                        {/* Benefits */}
                        <div className="bg-earth-50 p-6 border-t border-earth-100">
                            <h3 className="text-sm font-medium text-earth-900 mb-4">
                                Benefits of signing in:
                            </h3>
                            <ul className="space-y-3 text-sm text-earth-600">
                                <li className="flex items-start gap-3">
                                    <ShieldCheck size={18} className="text-green-600 shrink-0 mt-0.5" />
                                    <span>Save multiple delivery addresses</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <ShieldCheck size={18} className="text-green-600 shrink-0 mt-0.5" />
                                    <span>Faster checkout with saved details</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <ShieldCheck size={18} className="text-green-600 shrink-0 mt-0.5" />
                                    <span>Track your order history</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
