import React from 'react';
import { ShoppingCart, Hammer, PackageCheck, Truck } from 'lucide-react';

const steps = [
    {
        icon: <ShoppingCart size={32} />,
        title: '1. Place Order',
        description: 'Choose your favorite design or customize it.'
    },
    {
        icon: <Hammer size={32} />,
        title: '2. We Craft',
        description: 'Our artisans start making your item by hand.'
    },
    {
        icon: <PackageCheck size={32} />,
        title: '3. Quality Check',
        description: 'We ensure every detail is perfect before packing.'
    },
    {
        icon: <Truck size={32} />,
        title: '4. Shipped',
        description: 'Your unique piece is delivered to your doorstep.'
    }
];

const HowItWorks = () => {
    return (
        <section className="py-20 bg-earth-100/30 border-y border-earth-100">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-hand font-bold text-earth-900 mb-4">How AVCrafts Works</h2>
                    <p className="text-earth-600 max-w-2xl mx-auto">
                        We don't stock inventory. We create connections. Here is the journey of your product.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-earth-200 -translate-y-1/2 z-0"></div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center bg-white md:bg-transparent p-6 md:p-0 rounded-xl shadow-sm md:shadow-none">
                                <div className="w-16 h-16 bg-terracotta-500 text-white rounded-full flex items-center justify-center mb-6 shadow-lg transform hover:scale-110 transition-transform duration-300">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-earth-900 mb-2">{step.title}</h3>
                                <p className="text-earth-600 text-sm px-4">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
