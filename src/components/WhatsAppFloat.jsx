import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppFloat = ({ onClick }) => {
    return (
        <button 
        className="whatsapp-float hover-lift"
        onClick={onClick}
        aria-label="Contact via WhatsApp"
        >
        <MessageCircle size={28} />
        </button>
    );
};

export default WhatsAppFloat;
