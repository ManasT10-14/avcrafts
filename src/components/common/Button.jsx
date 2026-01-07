import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0";

    const variants = {
        primary: "bg-terracotta-500 text-white hover:bg-terracotta-600",
        secondary: "bg-earth-200 text-earth-900 hover:bg-earth-300 border border-earth-300",
        outline: "bg-transparent border-2 border-terracotta-500 text-terracotta-500 hover:bg-terracotta-50",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
