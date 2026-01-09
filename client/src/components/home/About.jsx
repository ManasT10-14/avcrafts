import React from 'react';
import { Target, Heart, Award } from 'lucide-react';

const About = () => {
    return (
        <section id="about" className="section-padding bg-earth-50">
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                {/* Image Side */}
                <div className="w-full md:w-1/2 relative">
                    <div className="aspect-[4/5] rounded-lg overflow-hidden relative z-10">
                        <img
                            src="/images/craftsman.png"
                            alt="Craftsman working on a frame"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute top-10 -left-6 w-full h-full border-2 border-earth-300 rounded-lg -z-0 hidden md:block"></div>
                </div>

                {/* Text Side */}
                <div className="w-full md:w-1/2 space-y-8">
                    <div>
                        <span className="text-earth-600 font-medium tracking-wide uppercase text-sm mb-2 block">Who We Are</span>
                        <h2 className="heading-md text-earth-900">Crafting Memories with<br />Passion & Precision</h2>
                    </div>

                    <p className="text-body text-lg">
                        At AV Crafts, we believe that every picture tells a story worth preserving. Founded in 2026, our studio was born from a simple desire: to create beautiful, handcrafted homes for your most cherished moments.
                    </p>

                    <p className="text-body text-base">
                        We combine traditional craftsmanship with modern aesthetics to deliver frames that don't just protect your art, but enhance it. From sourcing sustainable materials to the final hand-finish, every step is guided by our commitment to quality and emotion.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-earth-200 rounded-full text-earth-800 mt-1">
                                <Target size={20} />
                            </div>
                            <div>
                                <h4 className="font-serif text-lg font-medium text-earth-900">Precision</h4>
                                <p className="text-sm text-stone-600">Meticulous attention to detail in every corner.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-earth-200 rounded-full text-earth-800 mt-1">
                                <Heart size={20} />
                            </div>
                            <div>
                                <h4 className="font-serif text-lg font-medium text-earth-900">Passion</h4>
                                <p className="text-sm text-stone-600">Made with love, for your loved ones.</p>
                            </div>
                        </div>
                    </div>

                    <button className="btn-primary mt-4">
                        Read Our Story
                    </button>
                </div>
            </div>
        </section>
    );
};

export default About;
