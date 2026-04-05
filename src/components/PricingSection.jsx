import React from 'react';
import { Check, Star } from 'lucide-react';
import { pricingPlans } from '../data/mock';
import { useWhatsApp } from './useWhatsApp.jsx';

const PricingSection = () => {
    const { openWhatsApp } = useWhatsApp();

    const handleWhatsAppClick = (planName) => {
        const message = `Hola, me interesa el plan ${planName} de IteraGrow. ¿Podrían darme más información?`;
        openWhatsApp(message);
    };
    const formatPrice = (price) => new Intl.NumberFormat('es-CO').format(price);

    return (
        <section className="pricing-section" id="pricing">
        <div className="container">
            <div className="section-header">
            <h2 className="section-title">Planes diseñados para tu crecimiento</h2>
            <p className="section-subtitle">
                Elige el plan que se ajuste a tus necesidades y escala cuando estés listo
            </p>
            </div>

            <div className="pricing-grid">
            {pricingPlans.map((plan) => (
                <div 
                key={plan.id} 
                className={`pricing-card ${plan.popular ? 'popular' : ''} hover-lift`}
                >
                {plan.popular && (
                    <div className="popular-badge">
                    <Star size={16} />
                    Más Popular
                    </div>
                )}
                
                <div className="pricing-header">
                    <h3 className="plan-name">{plan.name}</h3>
                    <p className="plan-subtitle">{plan.subtitle}</p>
                    <div className="plan-price">
                    <span className="price-currency">$</span>
                    <span className="price-amount">{formatPrice(plan.price)}</span>
                    <span className="price-period">/{plan.period}</span>
                    </div>
                    <p className="plan-description">{plan.description}</p>
                </div>

                <div className="pricing-features">
                    {plan.features.map((feature, index) => (
                    <div key={index} className="feature-item">
                        <Check className="feature-check" size={20} />
                        <span className="feature-text">{feature}</span>
                    </div>
                    ))}
                </div>

                <button 
                    className={plan.popular ? "btn-primary" : "btn-secondary"}
                    onClick={() => handleWhatsAppClick(plan.name)}
                >
                    Elegir {plan.name}
                </button>
                </div>
            ))}
            </div>

            {/*
            <div className="pricing-guarantee">
                <div className="guarantee-content">
                    <h4 className="guarantee-title">Garantía de resultados</h4>
                    <p className="guarantee-text">
                    Si en los primeros 30 días no ves mejoras medibles en tus métricas clave,
                    trabajaremos gratis hasta que veas resultados o te devolvemos tu dinero.
                    </p>
                </div>
            </div>
            */}
        </div>
        </section>
    );
};

export default PricingSection;
