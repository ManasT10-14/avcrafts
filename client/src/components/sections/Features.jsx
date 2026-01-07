import React from 'react';
import { Heart, Clock, Leaf, ShieldCheck } from 'lucide-react';

const features = [
    {
        icon: <Clock size={32} />,
        title: 'Made on Demand',
        description: 'We don\'t mass produce. Your item is crafted only after you place an order, ensuring zero waste.'
    },
    {
        icon: <Heart size={32} />,
        title: 'Handcrafted Quality',
        description: 'Every brushstroke and stitch is applied by human hands, making your piece truly one-of-a-kind.'
    },
    {
        icon: <Leaf size={32} />,
        title: 'Eco-Conscious',
        description: 'By crafting on demand, we minimize excess inventory and use sustainable materials wherever possible.'
    },
    {
        icon: <ShieldCheck size={32} />,
        title: 'Artisan Promise',
        description: 'Direct support to independent creators. We guarantee the quality and care put into every order.'
    }
];

const Features = () => {
    return (
        <section className="py-20 bg-earth-100/50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-hand font-bold text-earth-900 mb-4">The AVCrafts Difference</h2>
                    <p className="text-earth-700">A better way to shop for art and gifts.</p>
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
