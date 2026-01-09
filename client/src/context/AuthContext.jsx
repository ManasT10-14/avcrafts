import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('avcrafts_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                localStorage.removeItem('avcrafts_user');
            }
        }
        setLoading(false);
    }, []);

    // Google login handler
    const loginWithGoogle = async (googleResponse) => {
        try {
            const response = await fetch(api.googleAuth(), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    googleId: googleResponse.sub,
                    email: googleResponse.email,
                    name: googleResponse.name,
                    picture: googleResponse.picture
                })
            });

            if (!response.ok) {
                throw new Error('Authentication failed');
            }

            const userData = await response.json();
            setUser(userData);
            localStorage.setItem('avcrafts_user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    // Logout handler
    const logout = () => {
        setUser(null);
        localStorage.removeItem('avcrafts_user');
    };

    // Update user profile
    const updateProfile = async (updates) => {
        if (!user) return;

        try {
            const response = await fetch(api.updateUser(user.id), {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            const updatedUser = await response.json();
            setUser(updatedUser);
            localStorage.setItem('avcrafts_user', JSON.stringify(updatedUser));
            return updatedUser;
        } catch (error) {
            console.error('Update error:', error);
            throw error;
        }
    };

    const value = {
        user,
        loading,
        isLoggedIn: !!user,
        loginWithGoogle,
        logout,
        updateProfile
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
