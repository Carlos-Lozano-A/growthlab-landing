import React from 'react';
import { ArrowRight, MessageCircle, TrendingUp, Users, Award, Clock } from 'lucide-react';
import { trustMetrics } from '../data/mock';

const HeroSection = () => {
    const handleWhatsAppClick = () => {
        window.open('https://wa.me/573154041487?text=Hola%2C%20quiero%20más%20información%20sobre%20IteraGrow', '_blank');
    };

    const scrollToPlans = () => {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero-section">
        <div className="container">
            {/* Logo/Brand */}
            <div className="hero-brand animate-fade-in">
            <h1 className="brand-logo">Itera<span className="brand-accent">Grow</span></h1>
            </div>

            {/* Main Content */}
            <div className="hero-content">
            <div className="hero-text animate-fade-in">
                <h1 className="hero-headline">
                Convierte tu inversión en 
                <span className="highlight-text"> resultados reales </span>
                </h1>
                <p className="hero-subheadline">
                Ayudamos a empresas a aumentar sus ventas usando publicidad basada en datos 
                en TikTok, Meta ads y Google Ads. Creación de campañas, segmentación de audiencia, 
                análisis de rendimiento y optimización.
                </p>

                {/* CTA Buttons */}
                <div className="hero-cta-group">
                <button className="btn-primary" onClick={handleWhatsAppClick}>
                    <MessageCircle size={20} />
                    Hablar por WhatsApp
                    <ArrowRight size={20} />
                </button>
                <button className="btn-secondary" onClick={scrollToPlans}>
                    Ver Planes
                </button>
                </div>

                {/* Trust Metrics */}
                <div className="trust-metrics">
                {trustMetrics.map((metric, index) => (
                    <div key={index} className="trust-metric-item">
                    <div className="metric-value">{metric.value}</div>
                    <div className="metric-label">{metric.label}</div>
                    </div>
                ))}
                </div>
            </div>

            {/* Hero Image */}
            <div className="hero-image animate-fade-in">
                <div className="hero-image-wrapper">
                <img 
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1Mjh8MHwxfHNlYXJjaHwyfHxkYXRhJTIwYW5hbHl0aWNzfGVufDB8fHx8MTc3NDM4MTI3OHww&ixlib=rb-4.1.0&q=85" 
                    alt="Data Analytics Dashboard"
                    className="hero-img"
                />
                <div className="hero-image-overlay"></div>
                </div>
            </div>
            </div>

            {/* Social Proof Badges */}
            <div className="social-proof animate-fade-in">
            <div className="proof-badge">
                <TrendingUp className="proof-icon" size={20} />
                <span>Resultados medibles</span>
            </div>
            <div className="proof-badge">
                <Users className="proof-icon" size={20} />
                <span>+150 empresas impulsadas</span>
            </div>
            <div className="proof-badge">
                <Award className="proof-icon" size={20} />
                <span>Certificados Google & Meta</span>
            </div>
            <div className="proof-badge">
                <Clock className="proof-icon" size={20} />
                <span>Monitoreo 24/7</span>
            </div>
            </div>
        </div>
        </section>
    );
};

export default HeroSection;
