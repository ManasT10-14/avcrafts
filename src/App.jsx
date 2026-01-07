import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Features from './components/sections/Features';
import Categories from './components/sections/Categories';
import TrendingProducts from './components/sections/TrendingProducts';
import Customization from './components/sections/Customization';
import Testimonials from './components/sections/Testimonials';

function App() {
    return (
        <div className="min-h-screen bg-earth-50 flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Hero />
                <Features />
                <Categories />
                <Customization />
                <TrendingProducts />
                <Testimonials />
            </main>
            <Footer />
        </div>
    );
}

export default App;
