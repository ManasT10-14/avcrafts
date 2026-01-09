import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
    const reviews = [
        {
            name: "Sarah Jenkins",
            role: "Interior Designer",
            text: "AV Crafts transformed my living room wall into a masterpiece. The quality of the frames is simply unmatched, and the attention to detail is evident in every corner.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
        },
        {
            name: "Michael Chen",
            role: "Artist",
            text: "As a photographer, clarity and presentation are everything. Their printing service brought my landscapes to life in ways I didn't think possible.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
        },
        {
            name: "Emily Clark",
            role: "Homeowner",
            text: "I ordered a custom gift for my parents' anniversary. It arrived beautifully packaged and the craftsmanship brought tears to their eyes.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    return (
        <section className="section-padding bg-earth-100 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-earth-200 rounded-full opacity-50 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-earth-200 rounded-full opacity-50 blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
                <div className="text-center mb-16">
                    <span className="text-earth-600 font-medium tracking-wide uppercase text-sm mb-2 block">Testimonials</span>
                    <h2 className="heading-md text-earth-900">Loved by Many</h2>
                    <div className="w-16 h-[1px] bg-earth-400 mx-auto mt-6"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 relative">
                            {/* Quote Icon */}
                            <div className="absolute top-6 right-8 text-6xl font-serif text-earth-100 leading-none">"</div>

                            <div className="flex items-center gap-4 mb-6 relative z-10">
                                <img
                                    src={review.image}
                                    alt={review.name}
                                    className="w-14 h-14 rounded-full object-cover border-2 border-earth-100"
                                />
                                <div>
                                    <h4 className="font-serif font-medium text-earth-900">{review.name}</h4>
                                    <p className="text-xs text-earth-500 uppercase tracking-wide">{review.role}</p>
                                </div>
                            </div>

                            <div className="flex gap-1 text-terracotta-500 mb-4 text-earth-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                                ))}
                            </div>

                            <p className="text-stone-600 text-sm leading-relaxed italic relative z-10">
                                {review.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
