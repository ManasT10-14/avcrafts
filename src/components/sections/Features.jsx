import React from 'react';
import { Heart, ShieldCheck, Leaf, PenTool } from 'lucide-react';

const features = [
    {
        icon: <Heart size={32} />,
        title: 'Made with Love',
        description: 'Every item is handcrafted with care and attention to detail by skilled artisans.'
    },
    {
        icon: <PenTool size={32} />,
        title: 'Custom Designs',
        description: 'Personalize your gifts with names, dates, or custom messages for a unique touch.'
    },
    {
        icon: <Leaf size={32} />,
        title: 'Eco-Friendly',
        description: 'We prioritize sustainable materials and eco-friendly packaging for a better planet.'
    },
    {
        icon: <ShieldCheck size={32} />,
        title: 'Quality Promise',
        description: 'We stand by the quality of our craftsmanship with a satisfaction guarantee.'
    }
];

const Features = () => {
    return (
        <section className="py-20 bg-earth-100/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-hand font-bold text-earth-900 mb-4">Why Choose AVCrafts?</h2>
                    <p className="text-earth-700">We believe in the power of handmade connections. Here's what sets us apart.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center border border-earth-100 group">
                            <div className="w-16 h-16 mx-auto mb-6 bg-terracotta-50 rounded-full flex items-center justify-center text-terracotta-500 group-hover:scale-110 group-hover:bg-terracotta-500 group-hover:text-white transition-all duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-earth-900 mb-3">{feature.title}</h3>
                            <p className="text-earth-600 leading-relaxed text-sm">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
