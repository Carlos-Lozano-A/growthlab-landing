import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight, Check, X } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import PricingSection from '../components/PricingSection';
import AddOnsSection from '../components/AddOnsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';

const Landing = () => {
    const [showStickyCTA, setShowStickyCTA] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        // Show sticky CTA after scrolling 800px
        setShowStickyCTA(window.scrollY > 800);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleWhatsAppClick = () => {
        window.open('https://wa.me/573154041487?text=Hola%2C%20quiero%20más%20información%20sobre%20GrowthLab', '_blank');
    };

    return (
        <div className="landing-page">
        {/* Sticky CTA Bar */}
        <div className={`sticky-cta ${showStickyCTA ? 'visible' : ''}`}>
            <div className="container">
            <div className="sticky-cta-content">
                <p className="sticky-cta-text">¿Listo para convertir tu inversión en ventas reales?</p>
                <button className="btn-primary" onClick={handleWhatsAppClick}>
                <MessageCircle size={20} />
                Hablar por WhatsApp
                </button>
            </div>
            </div>
        </div>

        {/* Main Content */}
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <PricingSection />
        <AddOnsSection />
        <TestimonialsSection />
        <FinalCTA />
        <Footer />

        {/* Floating WhatsApp Button */}
        <WhatsAppFloat onClick={handleWhatsAppClick} />
        </div>
    );
};

export default Landing;