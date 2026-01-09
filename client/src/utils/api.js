// API Configuration Utility
// Uses environment variable for API URL to support production deployment

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = {
    // Base URL
    baseUrl: API_URL,

    // Product endpoints
    getProducts: (categoryId) => `${API_URL}/api/products/${categoryId}`,
    getProductDetail: (id) => `${API_URL}/api/product/detail/${id}`,
    getProductPrices: (id) => `${API_URL}/api/product/${id}/prices`,

    // Order endpoints
    createOrder: () => `${API_URL}/api/orders`,
    getOrders: (userId) => `${API_URL}/api/orders/${userId}`,

    // Admin endpoints
    getAdminOrders: () => `${API_URL}/api/admin/orders`,
    updateOrderStatus: (orderId) => `${API_URL}/api/admin/orders/${orderId}/status`,
    deleteAllOrders: () => `${API_URL}/api/admin/orders`,

    // Auth endpoints
    googleAuth: () => `${API_URL}/api/auth/google`,
    getUser: (userId) => `${API_URL}/api/auth/user/${userId}`,
    updateUser: (userId) => `${API_URL}/api/auth/user/${userId}`,

    // Address endpoints
    getAddresses: (userId) => `${API_URL}/api/addresses/${userId}`,
    createAddress: () => `${API_URL}/api/addresses`,
    updateAddress: (id) => `${API_URL}/api/addresses/${id}`,
    deleteAddress: (id) => `${API_URL}/api/addresses/${id}`,
    setDefaultAddress: (id) => `${API_URL}/api/addresses/${id}/default`,
};

export default api;

