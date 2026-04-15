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
            <div className="hero-video-wrapper">
                <video
                    className="hero-video"
                    autoPlay
                    muted
                    loop
                    playsInline
                >
                    <source src="/assets/video/hero-bg.mp4" type="video/mp4" />
                </video>
                <div className="hero-video-overlay" />
                <div className="hero-video-brand animate-fade-in">
                    <p className="hero-video-tagline">Agencia de crecimiento digital</p>
                    <h1 className="brand-logo-video">
                        Itera<span className="brand-accent">Grow</span>
                    </h1>
                    <p className="hero-video-platforms">Meta · Google · TikTok Ads</p>
                </div>
            </div>

        <div className="container">
            {/* Main Content */}
            <div className="hero-content">
            <div className="hero-text animate-fade-in">
                <h2 className="hero-headline">
                Convierte tu inversión en 
                <span className="highlight-text"> resultados reales </span>
                </h2>
                <p className="hero-subheadline">
                Ayudamos a empresas a aumentar sus ventas usando publicidad basada en datos 
                en TikTok, Meta ads y Google Ads. Solo lo que mueve tu negocio.
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
                <span>Procesos automatizados con IA</span>
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
