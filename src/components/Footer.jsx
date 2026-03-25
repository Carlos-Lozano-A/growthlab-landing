import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { SOCIAL_LINKS, CONTACT_EMAIL, WHATSAPP_PHONE_NUMBER } from './config.jsx';

const Footer = () => {
    return (
        <footer className="footer">
        <div className="container">
            <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-column">
                <h3 className="footer-logo">Growth<span className="brand-accent">Lab</span></h3>
                <p className="footer-description">
                Ayudamos a empresas locales a escalar sus ventas con estrategias digitales probadas y basadas en datos.
                </p>
                <div className="footer-social">
                <a href={SOCIAL_LINKS.FACEBOOK} className="footer-social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                    <Facebook size={20} />
                </a>
                <a href={SOCIAL_LINKS.INSTAGRAM} className="footer-social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                    <Instagram size={20} />
                </a>
                <a href={SOCIAL_LINKS.LINKEDIN} className="footer-social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                    <Linkedin size={20} />
                </a>
                <a href={SOCIAL_LINKS.TWITTER} className="footer-social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                    <Twitter size={20} />
                </a>
                </div>
            </div>

            {/* Links Column */}
            <div className="footer-column">
                <h4 className="footer-column-title">Empresa</h4>
                <ul className="footer-links">
                <li><a href="#">Sobre nosotros</a></li>
                <li><a href="#">Casos de éxito</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Carreras</a></li>
                </ul>
            </div>

            {/* Services Column */}
            <div className="footer-column">
                <h4 className="footer-column-title">Servicios</h4>
                <ul className="footer-links">
                <li><a href="#">Publicidad en Redes</a></li>
                <li><a href="#">Google Ads</a></li>
                <li><a href="#">Automatización</a></li>
                <li><a href="#">Consultoría</a></li>
                </ul>
            </div>

            {/* Contact Column */}
            <div className="footer-column">
                <h4 className="footer-column-title">Contacto</h4>
                <ul className="footer-contact">
                <li className="contact-item">
                    <Mail size={16} />
                    <a href={`mailto:${CONTACT_EMAIL}`}><span>{CONTACT_EMAIL}</span></a>
                </li>
                <li className="contact-item">
                    <Phone size={16} />
                    <a href={`tel:+${WHATSAPP_PHONE_NUMBER}`}><span>+{WHATSAPP_PHONE_NUMBER}</span></a>
                </li>
                <li className="contact-item">
                    <MapPin size={16} />
                    <span>Palmira, Colombia</span>
                </li>
                </ul>
            </div>
            </div>

            <div className="footer-bottom">
            <p className="footer-copyright">
                &copy; {new Date().getFullYear()} GrowthLab. Todos los derechos reservados.
            </p>
            <div className="footer-legal">
                <a href="#">Términos</a>
                <span className="separator">•</span>
                <a href="#">Privacidad</a>
                <span className="separator">•</span>
                <a href="#">Cookies</a>
            </div>
            </div>
        </div>
        </footer>
    );
};

export default Footer;