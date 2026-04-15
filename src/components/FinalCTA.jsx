import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { submitLeadForm } from '../data/mock';
import { toast } from 'sonner';
import { useWhatsApp } from './useWhatsApp.jsx';

const FinalCTA = () => {
    const { openWhatsApp } = useWhatsApp();
    const [formData, setFormData] = useState({
        name: '',
        business: '',
        phone: '',
        goal: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
        const result = await submitLeadForm(formData);
        if (result.success) {
            toast.success(result.message);
            setFormData({ name: '', business: '', phone: '', goal: '' });
        }
        } catch (error) {
        toast.error('Hubo un error. Por favor intenta de nuevo.');
        } finally {
        setIsSubmitting(false);
        }
    };

    const handleWhatsAppClick = () => {
        const message = 'Hola, quiero empezar a convertir mi inversión en ventas';
        openWhatsApp(message);
    };

    return (
        <section className="final-cta-section">
        <div className="container">
            <div className="final-cta-content">
            <div className="final-cta-text">
                <h2 className="final-cta-title">
                Empieza a convertir tu inversión en ventas reales hoy mismo.
                </h2>
                <p className="final-cta-subtitle">
                No sigas perdiendo dinero en publicidad que no funciona. Deja que nuestro equipo 
                de expertos convierta cada peso invertido en resultados medibles.
                </p>

                <div className="final-cta-features">
                <div className="cta-feature">✓ Sin contratos de permanencia</div>
                {/*<div className="cta-feature">✓ Resultados en 30 días o garantía de devolución</div>*/}
                <div className="cta-feature">✓ Asesoría gratuita inicial</div>
                </div>

                <button className="btn-primary btn-lg" onClick={handleWhatsAppClick}>
                Hablar con un experto ahora
                <ArrowRight size={20} />
                </button>
            </div>

            <div className="final-cta-form">
                <div className="form-card">
                <h3 className="form-title">O déjanos tus datos</h3>
                <p className="form-subtitle">Te contactaremos en menos de 24 horas</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                    <label htmlFor="name" className="form-label">Nombre completo</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="input-field"
                        placeholder="Juan Pérez"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="business" className="form-label">Nombre del negocio</label>
                    <input
                        type="text"
                        id="business"
                        name="business"
                        className="input-field"
                        placeholder="Mi Empresa SAS"
                        value={formData.business}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="phone" className="form-label">WhatsApp / Teléfono</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="input-field"
                        placeholder="315 123 4567"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    </div>

                    <div className="form-group">
                    <label htmlFor="goal" className="form-label">¿Cuál es tu objetivo principal?</label>
                    <select
                        id="goal"
                        name="goal"
                        className="input-field"
                        value={formData.goal}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="more-clients">Conseguir más clientes</option>
                        <option value="better-roi">Mejorar ROI de publicidad</option>
                        <option value="control">Tener control de procesos</option>
                        <option value="scale">Escalar mi negocio</option>
                    </select>
                    </div>

                    <button 
                    type="submit" 
                    className="btn-primary w-full"
                    disabled={isSubmitting}
                    >
                    {isSubmitting ? (
                        <>
                        <Loader2 size={20} className="spinner" />
                        Enviando...
                        </>
                    ) : (
                        <>
                        Enviar solicitud
                        <ArrowRight size={20} />
                        </>
                    )}
                    </button>
                </form>
                </div>
            </div>
            </div>
        </div>
        </section>
    );
};

export default FinalCTA;
