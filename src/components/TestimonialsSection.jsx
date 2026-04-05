import React from 'react';
import { Quote } from 'lucide-react';
import { testimonials } from '../data/mock';

const TestimonialsSection = () => {
    return (
        <section className="testimonials-section">
        <div className="container">
            <div className="section-header">
            <h2 className="section-title">Lo que dicen nuestros clientes</h2>
            <p className="section-subtitle">
                Resultados reales de empresas que confiaron en IteraGrow
            </p>
            </div>

            <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card hover-lift">
                <Quote className="quote-icon" size={40} />
                
                <p className="testimonial-text">
                    "{testimonial.testimonial}"
                </p>

                <div className="testimonial-result">
                    {testimonial.result}
                </div>

                <div className="testimonial-author">
                    <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="author-image"
                    />
                    <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-business">{testimonial.business}</p>
                    <p className="author-role">{testimonial.role}</p>
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
};

export default TestimonialsSection;
