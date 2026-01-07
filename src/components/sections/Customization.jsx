import React from 'react';
import { Upload, Palette, Gift } from 'lucide-react';
import Button from '../common/Button';

const steps = [
    {
        icon: <Upload size={32} />,
        title: '1. Upload Your Art',
        description: 'Upload your photos, designs, or artwork directly to our platform.'
    },
    {
        icon: <Palette size={32} />,
        title: '2. Customize It',
        description: 'Choose your product, adjust colors, and add personal text.'
    },
    {
        icon: <Gift size={32} />,
        title: '3. We Create & Ship',
        description: 'Our artisans craft your unique piece and ship it to your door.'
    }
];

const Customization = () => {
    return (
        <section className="py-24 bg-terracotta-50 relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-terracotta-200/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Content */}
                    <div className="flex-1 space-y-8">
                        <h2 className="text-4xl lg:text-5xl font-hand font-bold text-earth-900 leading-tight">
                            Create Something <br />
                            <span className="text-terracotta-600">Uniquely Yours.</span>
                        </h2>
                        <p className="text-lg text-earth-700 leading-relaxed">
                            Don't settle for mass-produced. With AVCrafts, you become the artist.
                            Our easy-to-use customization tools let you turn your memories and ideas into tangible, high-quality products.
                        </p>

                        <div className="space-y-6 pt-4">
                            {steps.map((step, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-terracotta-500 shadow-sm shrink-0">
                                        {step.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-earth-900">{step.title}</h3>
                                        <p className="text-earth-600 sm:text-base text-sm">{step.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-6">
                            <Button>Start Designing Now</Button>
                        </div>
                    </div>

                    {/* Visual Showcase */}
                    <div className="flex-1 w-full max-w-lg lg:max-w-none">
                        <div className="relative">
                            <div className="aspect-[4/5] bg-white rounded-3xl shadow-2xl p-4 rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                                <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800" alt="Customization Preview" className="w-full h-full object-cover rounded-2xl" />

                                {/* Floating UI Elements mocking customization */}
                                <div className="absolute top-8 right-8 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg flex gap-2 animate-bounce-slow">
                                    <div className="w-6 h-6 rounded-full bg-red-400 border-2 border-white"></div>
                                    <div className="w-6 h-6 rounded-full bg-blue-400 border-2 border-white"></div>
                                    <div className="w-6 h-6 rounded-full bg-green-400 border-2 border-white"></div>
                                </div>
                                <div className="absolute bottom-12 left-8 bg-white/90 backdrop-blur rounded-lg px-4 py-2 shadow-lg font-hand text-lg text-earth-800 animate-pulse-slow">
                                    "Happy Birthday Mom!"
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Customization;
