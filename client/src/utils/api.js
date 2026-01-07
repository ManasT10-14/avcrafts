// API Configuration Utility
// Uses environment variable for API URL to support production deployment

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = {
    // Product endpoints
    getProducts: () => `${API_URL}/api/products`,
    getProductDetail: (id) => `${API_URL}/api/product/detail/${id}`,

    // Order endpoints
    createOrder: () => `${API_URL}/api/orders`,
    getOrders: (userId) => `${API_URL}/api/orders/${userId}`,

    // Admin endpoints
    getAdminOrders: () => `${API_URL}/api/admin/orders`,
    updateOrderStatus: (orderId) => `${API_URL}/api/admin/orders/${orderId}/status`,
};

export default api;
