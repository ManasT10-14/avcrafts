import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Sarah J.',
        role: 'Art Enthusiast',
        content: "The quality of the prints is absolutely stunning. I ordered a custom framed piece for my anniversary and it exceeded all expectations!",
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
    },
    {
        id: 2,
        name: 'Michael T.',
        role: 'Gift Buyer',
        content: "AVCrafts made it so easy to find a unique gift. The packaging was eco-friendly and beautiful. Highly recommend!",
        avatar: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=100'
    }
];

const Testimonials = () => {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-4xl font-hand font-bold text-earth-900 mb-12">What Our Customers Say</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {testimonials.map((t) => (
                        <div key={t.id} className="bg-white p-8 rounded-2xl shadow-sm border border-earth-100 flex flex-col items-center text-center">
                            <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-terracotta-200" />
                            <div className="flex text-terracotta-500 gap-1 mb-4">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <p className="text-earth-600 mb-6 italic">"{t.content}"</p>
                            <div>
                                <h4 className="font-bold text-earth-900">{t.name}</h4>
                                <p className="text-sm text-earth-500">{t.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
