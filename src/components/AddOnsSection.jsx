import React from 'react';
import { Bot, BarChart3, TrendingUp } from 'lucide-react';
import { addOns } from '../data/mock';

const iconMap = {
    Bot,
    BarChart3,
    TrendingUp
    };

    const AddOnsSection = () => {
    const handleWhatsAppClick = (serviceName) => {
        const message = `Hola, me interesa el servicio adicional: ${serviceName}. ¿Podrían darme más información?`;
        window.open(`https://wa.me/573154041487?text=${encodeURIComponent(message)}`, '_blank');
    };
    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CO').format(price);
    };

    return (
        <section className="addons-section">
        <div className="container">
            <div className="section-header">
            <h2 className="section-title">Servicios adicionales</h2>
            <p className="section-subtitle">
                Potencia aún más tus resultados con servicios especializados
            </p>
            </div>

            <div className="addons-grid">
            {addOns.map((addon, index) => {
                const Icon = iconMap[addon.icon];
                return (
                <div key={index} className="addon-card">
                    <div className="addon-header">
                    <Icon className="addon-icon" size={32} />
                    <h3 className="addon-category">{addon.category}</h3>
                    </div>
                    <div className="addon-services">
                    {addon.services.map((service, sIndex) => (
                        <div key={sIndex} className="addon-service-item">
                        <div className="service-info">
                            <span className="service-name">{service.name}</span>
                            {/*<span className="service-price">${formatPrice(service.price)} COP</span>*/}
                        </div>
                        <button 
                            className="btn-ghost btn-sm"
                            onClick={() => handleWhatsAppClick(service.name)}
                        >
                            Consultar
                        </button>
                        </div>
                    ))}
                    </div>
                </div>
                );
            })}
            </div>

            <div className="addons-cta">
            <p className="addons-cta-text">
                ¿No encuentras lo que buscas? Creamos soluciones personalizadas para tu negocio.
            </p>
            <button 
                className="btn-secondary"
                onClick={() => window.open('https://wa.me/573154041487?text=Hola%2C%20necesito%20una%20solución%20personalizada', '_blank')}
            >
                Hablar con un asesor
            </button>
            </div>
        </div>
        </section>
    );
};

export default AddOnsSection;
