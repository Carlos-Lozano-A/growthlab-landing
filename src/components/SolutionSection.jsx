import React from 'react';
import { Target, Layers, Zap, PieChart } from 'lucide-react';
import { solutions } from '../data/mock';

const iconMap = {
    Target,
    Layers,
    Zap,
    PieChart
    };

    const SolutionSection = () => {
    return (
        <section className="solution-section">
        <div className="container">
            <div className="section-header">
            <h2 className="section-title">
                Cómo <span className="highlight-text">GrowthLab</span> resuelve tus problemas
            </h2>
            <p className="section-subtitle">
                Nuestra metodología probada para convertir tu inversión en resultados medibles
            </p>
            </div>

            <div className="solutions-grid">
            {solutions.map((solution, index) => {
                const Icon = iconMap[solution.icon];
                return (
                <div key={index} className="solution-card hover-lift">
                    <div className="solution-icon-wrapper">
                    <Icon className="solution-icon" size={28} />
                    </div>
                    <h3 className="solution-title">{solution.title}</h3>
                    <p className="solution-description">{solution.description}</p>
                </div>
                );
            })}
            </div>

            {/* Value Proposition Highlight */}
            <div className="value-proposition">
            <div className="value-content">
                <h3 className="value-title">Tu socio de crecimiento basado en datos</h3>
                <p className="value-text">
                No somos solo otra agencia de marketing. Somos tu equipo de crecimiento dedicado, 
                enfocado en un solo objetivo: aumentar tus ventas de manera consistente y predecible 
                usando tecnología, datos y optimización continua.
                </p>
            </div>
            <div className="value-image">
                <img 
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMjd8MHwxfHNlYXJjaHwyfHxkaWdpdGFsJTIwbWFya2V0aW5nfGVufDB8fHx8MTc3NDM4MTI3NHww&ixlib=rb-4.1.0&q=85" 
                alt="Digital Marketing Workspace"
                className="value-img"
                />
            </div>
            </div>
        </div>
        </section>
    );
};

export default SolutionSection;
