'use client';

import { useState } from 'react';
import { Mail, Phone, Send, MapPin } from 'lucide-react';

const Instagram = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    whatsapp: '',
    servico: 'Branding & Design',
    mensagem: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format message for WhatsApp
    const message = `Olá Rayssa! Me chamo ${formData.nome}${formData.empresa ? ` da ${formData.empresa}` : ''}.
Gostaria de solicitar um orçamento para *${formData.servico}*.

*Detalhes do Projeto:*
${formData.mensagem}

*Contato:* ${formData.whatsapp}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5592993398936?text=${encodedMessage}`;
    
    // Open in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contato" className="relative bg-zinc-950 py-24 md:py-32 overflow-hidden border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="flex flex-col space-y-4 mb-16 md:mb-24">
          <span className="text-xs uppercase tracking-[0.4em] font-semibold text-neon-purple">
            Let's build
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase font-space">
            CONTATO
          </h2>
        </div>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Info Side (5 cols) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                VAMOS ELEVAR A SUA MARCA JUNTOS.
              </h3>
              <p className="text-zinc-500 font-light text-sm md:text-base leading-relaxed">
                Preencha o formulário ao lado e inicie o atendimento instantâneo pelo nosso canal oficial do WhatsApp.
              </p>
            </div>

            {/* Direct Info list */}
            <div className="space-y-6">
              <a
                href="https://wa.me/5592993398936"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 rounded-xl bg-zinc-900 border border-zinc-900 hover:border-neon-purple/40 hover:bg-zinc-900/80 transition-all duration-300 group cursor-pointer"
              >
                <div className="p-3 rounded-lg bg-zinc-950 text-zinc-400 group-hover:text-neon-purple transition-colors">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">WhatsApp</p>
                  <p className="text-sm font-semibold text-white">+55 (92) 99339-8936</p>
                </div>
              </a>

              <a
                href="mailto:contato@risecreative.com"
                className="flex items-center space-x-4 p-4 rounded-xl bg-zinc-900 border border-zinc-900 hover:border-neon-pink/40 hover:bg-zinc-900/80 transition-all duration-300 group cursor-pointer"
              >
                <div className="p-3 rounded-lg bg-zinc-950 text-zinc-400 group-hover:text-neon-pink transition-colors">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">E-mail</p>
                  <p className="text-sm font-semibold text-white">contato@risecreative.com</p>
                </div>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 rounded-xl bg-zinc-900 border border-zinc-900 hover:border-electric-blue/40 hover:bg-zinc-900/80 transition-all duration-300 group cursor-pointer"
              >
                <div className="p-3 rounded-lg bg-zinc-950 text-zinc-400 group-hover:text-electric-blue transition-colors">
                  <Instagram size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Instagram</p>
                  <p className="text-sm font-semibold text-white">@risecreative.house</p>
                </div>
              </a>

              <div className="flex items-center space-x-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-900/60 cursor-default">
                <div className="p-3 rounded-lg bg-zinc-950 text-zinc-500">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">Localização</p>
                  <p className="text-sm font-semibold text-white">Manaus • Amazonas</p>
                </div>
              </div>
            </div>

            <div className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase">
              RISE CREATIVE HOUSE • CREATE BEYOND LIMITS
            </div>
          </div>

          {/* Form Side (7 cols) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 md:p-10 rounded-2xl glass border border-zinc-900 space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Nome */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="nome" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    required
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Ex: Rayssa Castro"
                    className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-700 focus:border-neon-purple focus:outline-none transition-all text-sm font-light"
                  />
                </div>

                {/* Empresa / Evento */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="empresa" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    Empresa / Evento
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleChange}
                    placeholder="Ex: Conferência Jovens"
                    className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-700 focus:border-neon-purple focus:outline-none transition-all text-sm font-light"
                  />
                </div>
              </div>

              {/* Whatsapp */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="whatsapp" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  Seu WhatsApp *
                </label>
                <input
                  type="text"
                  id="whatsapp"
                  name="whatsapp"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="Ex: (92) 99339-8936"
                  className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-700 focus:border-neon-purple focus:outline-none transition-all text-sm font-light"
                />
              </div>

              {/* Serviço */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="servico" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  Serviço de Interesse
                </label>
                <select
                  id="servico"
                  name="servico"
                  value={formData.servico}
                  onChange={handleChange}
                  className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white focus:border-neon-purple focus:outline-none transition-all text-sm font-light cursor-pointer"
                >
                  <option value="Branding & Design">Branding & Design</option>
                  <option value="Streetwear Personalizado">Streetwear Personalizado</option>
                  <option value="Motion Design & Lyric Videos">Motion Design & Lyric Videos</option>
                  <option value="FilmMaker & Cobertura">FilmMaker & Cobertura de Evento</option>
                  <option value="Merch & Acessórios">Merch & Acessórios</option>
                  <option value="Outro Serviço">Outro Serviço</option>
                </select>
              </div>

              {/* Mensagem */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="mensagem" className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                  Mensagem / Detalhes do Projeto *
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  required
                  rows={4}
                  value={formData.mensagem}
                  onChange={handleChange}
                  placeholder="Conte-nos um pouco sobre a sua ideia ou necessidade..."
                  className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-700 focus:border-neon-purple focus:outline-none transition-all text-sm font-light resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-3 py-4 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-xl hover:bg-neon-purple hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] cursor-pointer"
              >
                <span>Enviar Orçamento</span>
                <Send size={12} />
              </button>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
