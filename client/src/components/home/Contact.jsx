import React from 'react';

const Contact = () => {
    return (
        <section id="contact" className="section-padding bg-white">
            <div className="max-w-4xl mx-auto bg-earth-50 rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row">
                {/* Form Side */}
                <div className="p-8 md:p-12 w-full md:w-3/5">
                    <h2 className="text-3xl font-serif text-earth-900 mb-2">Get in Touch</h2>
                    <p className="text-stone-600 mb-8 text-sm">Have a custom project in mind? Let's talk.</p>

                    <form className="space-y-6">
                        <div>
                            <label className="block text-xs font-medium text-earth-700 uppercase tracking-wide mb-2">Name</label>
                            <input
                                type="text"
                                className="w-full bg-white border border-earth-200 rounded-md px-4 py-3 text-stone-700 focus:outline-none focus:ring-1 focus:ring-earth-400 transition-all font-light"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-earth-700 uppercase tracking-wide mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full bg-white border border-earth-200 rounded-md px-4 py-3 text-stone-700 focus:outline-none focus:ring-1 focus:ring-earth-400 transition-all font-light"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-earth-700 uppercase tracking-wide mb-2">Message</label>
                            <textarea
                                rows="4"
                                className="w-full bg-white border border-earth-200 rounded-md px-4 py-3 text-stone-700 focus:outline-none focus:ring-1 focus:ring-earth-400 transition-all font-light resize-none"
                                placeholder="Tell us about the memory you want to frame..."
                            ></textarea>
                        </div>
                        <button type="button" className="w-full btn-primary">
                            Send Message
                        </button>
                    </form>
                </div>

                {/* Info Side */}
                <div className="bg-earth-800 p-8 md:p-12 w-full md:w-2/5 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="relative z-10 space-y-8">
                        <div>
                            <h3 className="font-serif text-xl mb-4 text-earth-100">Visit Us</h3>
                            <p className="text-earth-200 text-sm leading-relaxed">
                                123 Artisan Way,<br />
                                Creative District,<br />
                                LA 90210
                            </p>
                        </div>
                        <div>
                            <h3 className="font-serif text-xl mb-4 text-earth-100">Opening Hours</h3>
                            <p className="text-earth-200 text-sm leading-relaxed">
                                Mon - Fri: 9am - 6pm<br />
                                Sat: 10am - 4pm<br />
                                Sun: Closed
                            </p>
                        </div>
                        <div>
                            <h3 className="font-serif text-xl mb-4 text-earth-100">Contact</h3>
                            <p className="text-earth-200 text-sm leading-relaxed">
                                hello@memorilb.com<br />
                                +1 (555) 123-4567
                            </p>
                        </div>
                    </div>

                    {/* Decorative Circle */}
                    <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-earth-700 rounded-full opacity-50 z-0"></div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
