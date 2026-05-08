/**
 * Chatbot Component
 * Visual chatbot that redirects to WhatsApp
 * Purely decorative with functional redirect
 */
import { useState } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const phoneNumber = '573001234567';
      const text = encodeURIComponent(
        `¡Hola Pedigree Palace! ${message}`
      );
      window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
      setMessage('');
      setOpen(false);
    }
  };

  const quickReplies = [
    '¿Qué razas tienen disponibles?',
    '¿Cuál es el precio de un Bulldog Francés?',
    '¿Hacen envíos internacionales?',
    '¿Cómo puedo rastrear mi pedido?',
  ];

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 z-[99] w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border-2 border-gold bg-[var(--pp-bg-dark)]"
        aria-label="Abrir chat"
        style={{ display: open ? 'none' : 'flex' }}
      >
        <MessageCircle size={20} className="text-gold" />
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-[99] w-[320px] bg-[var(--pp-bg)] border border-[var(--pp-border)] shadow-2xl overflow-hidden"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          {/* Header */}
          <div className="bg-[var(--pp-bg-dark)] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
                <MessageCircle size={14} color="#111" />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Pedigree Palace</p>
                <p className="text-[var(--pp-gold-light)] text-xs">En línea</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:text-gold transition-colors"
              aria-label="Cerrar chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages area */}
          <div className="px-4 py-4 space-y-3 min-h-[200px]">
            <div className="bg-[var(--pp-bg-dark)] text-white text-sm p-3 rounded-br-lg max-w-[85%]">
              ¡Hola! Soy el asistente virtual de Pedigree Palace. ¿En qué puedo ayudarte hoy?
            </div>

            {/* Quick replies */}
            <div className="space-y-2 pt-2">
              {quickReplies.map((reply, i) => (
                <button
                  key={i}
                  onClick={() => {
                    const phoneNumber = '573001234567';
                    const text = encodeURIComponent(reply);
                    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
                  }}
                  className="block w-full text-left text-sm text-[var(--pp-text-secondary)] border border-[var(--pp-border)] px-3 py-2 hover:border-gold hover:text-gold transition-colors"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-[var(--pp-border)] flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="flex-1 bg-transparent text-sm border border-[var(--pp-border)] px-3 py-2 focus:border-gold focus:outline-none"
            />
            <button
              type="submit"
              className="w-10 h-10 bg-gold flex items-center justify-center hover:bg-[var(--pp-gold-dark)] transition-colors"
              aria-label="Enviar mensaje"
            >
              <Send size={16} color="#111" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
