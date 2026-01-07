import React, { useEffect } from 'react';
import ContactForm from '../components/home/Contact'; // Reusing the component we made

const Contact = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="pt-24 pb-12">
            <div className="text-center mb-10">
                <h1 className="heading-lg text-earth-900">Contact Us</h1>
                <p className="text-body max-w-2xl mx-auto">We'd love to hear from you. Send us a message about your custom framing needs.</p>
            </div>
            <ContactForm />
        </div>
    );
};

export default Contact;
