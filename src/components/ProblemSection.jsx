import React from 'react';
import { UserX, DollarSign, AlertCircle, Bot, Lightbulb, Heart } from 'lucide-react';
import { problems } from '../data/mock';

const iconMap = {
    UserX,
    DollarSign,
    AlertCircle,
    AutomationAgent: Bot,
    Lightbulb,
    Heart,
};

const ProblemSection = () => {
    return (
        <section className="problem-section">
        <div className="container">
            <div className="section-header">
            <h2 className="section-title">¿Te suena familiar?</h2>
            <p className="section-subtitle">
                Estos son los problemas más comunes que enfrentan los emprendedores y dueños de negocio
            </p>
            </div>

            <div className="problems-grid">
            {problems.map((problem, index) => {
                const Icon = iconMap[problem.icon];
                return (
                <div key={index} className="problem-card animate-fade-in">
                    <div className="problem-icon-wrapper">
                    <div className="problem-icon-bg"></div>
                    <Icon className="problem-icon" size={32} />
                    </div>
                    <h3 className="problem-title">{problem.title}</h3>
                    <p className="problem-description">{problem.description}</p>
                </div>
                );
            })}
            </div>

            {/* Problem Image */}
            <div className="problem-visual">
            <img 
                src="https://images.pexels.com/photos/313690/pexels-photo-313690.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" 
                alt="Business challenges"
                className="problem-img"
            />
            <div className="problem-overlay">
                <h3 className="overlay-text">
                Es hora de tomar el control de tu crecimiento
                </h3>
            </div>
            </div>
        </div>
        </section>
    );
};

export default ProblemSection;
