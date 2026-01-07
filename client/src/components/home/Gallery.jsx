import React from 'react';

const Gallery = () => {
    // Curated mix of Magnets and Frames
    const images = [
        "/images/polaroid-memories.png",
        "/images/gallery-wall.png",
        "/images/fridge-magnets.png",
        "/images/magnetic-frames.png",
        "/images/craftsman.png",
        "/images/hero-bg.png"
    ];

    return (
        <section id="gallery" className="section-padding bg-white">
            <div className="text-center mb-16">
                <h2 className="heading-md text-earth-800">Our Portfolio</h2>
                <div className="w-16 h-[1px] bg-earth-400 mx-auto mb-6"></div>
                <p className="text-body max-w-2xl mx-auto">
                    A glimpse into the stories we've helped frame and the spaces we've transformed.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((src, index) => (
                    <div key={index} className="group relative overflow-hidden aspect-square rounded-sm cursor-pointer">
                        <img
                            src={src}
                            alt={`Gallery Item ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="text-white font-serif text-xl tracking-wide">View Project</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="text-center mt-12">
                <button className="btn-secondary">
                    View Full Gallery
                </button>
            </div>
        </section>
    );
};

export default Gallery;
