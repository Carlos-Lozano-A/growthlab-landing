import { WHATSAPP_BASE_URL } from './config.jsx';

/**
 * Custom hook for handling WhatsApp redirection.
 * @returns {function(string): void} A function to open a WhatsApp chat with a pre-filled message.
 */
export const useWhatsApp = () => {
    const openWhatsApp = (message) => {
        window.open(`${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`, '_blank');
    };
    return { openWhatsApp };
};