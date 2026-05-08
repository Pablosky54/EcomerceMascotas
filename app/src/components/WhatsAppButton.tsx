/**
 * WhatsAppButton Component
 * Floating WhatsApp button with predefined message
 */
import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '573001234567'; // Colombia format
  const message = encodeURIComponent(
    '¡Hola Pedigree Palace! Me interesa conocer más sobre sus mascotas premium. ¿Podrían ayudarme?'
  );
  const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[100] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
      style={{
        background: '#25D366',
        boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
      }}
      aria-label="Contactar por WhatsApp"
      title="Contactar por WhatsApp"
    >
      <MessageCircle size={26} color="white" fill="white" />
    </a>
  );
}
