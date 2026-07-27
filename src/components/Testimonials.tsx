'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: "A Rise Creative elevou o patamar de comunicação do nosso evento. Os motion flyers e as camisetas oversized personalizadas ficaram espetaculares, atraindo muito mais público e dando uma identidade premium de verdade!",
    author: "Lucas Souza",
    role: "Pastor e Organizador de Eventos",
    org: "Conferência Jovens de Propósito"
  },
  {
    quote: "Profissionalismo impecável. O rebranding e o desenvolvimento da identidade visual que a Rayssa fez para a nossa marca mudou completamente o nosso posicionamento no mercado, gerando valor imediato.",
    author: "Mariana Costa",
    role: "Fundadora",
    org: "Urban Wear Label"
  },
  {
    quote: "A qualidade dos tecidos e das estampas é surreal, totalmente diferente do padrão de gráfica/estamparia comum. Sem contar as captações do FilmMaker Mobile que geraram Reels incríveis pro nosso perfil.",
    author: "Thiago Ramos",
    role: "Diretor Criativo",
    org: "Arena Church Manaus"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden border-t border-zinc-950">
      
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.4em] font-semibold text-neon-purple block mb-2">
            Feedback
          </span>
          <h3 className="text-3xl font-bold tracking-tight text-white uppercase font-space">
            O QUE DIZEM NOSSOS CLIENTES
          </h3>
        </div>

        {/* Carousel Container */}
        <div className="relative glass border border-zinc-900 rounded-3xl p-8 md:p-16 flex flex-col items-center text-center">
          
          {/* Quote Icon */}
          <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mb-8">
            <Quote size={20} className="fill-zinc-500/20" />
          </div>

          {/* Testimonial Quote slider block */}
          <div className="min-h-[160px] md:min-h-[120px] flex items-center justify-center max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="text-lg md:text-xl font-light text-zinc-300 leading-relaxed italic">
                  "{TESTIMONIALS[currentIndex].quote}"
                </p>
                <div className="flex flex-col space-y-0.5">
                  <span className="text-sm font-semibold text-white tracking-tight">
                    {TESTIMONIALS[currentIndex].author}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono tracking-wider uppercase">
                    {TESTIMONIALS[currentIndex].role} • {TESTIMONIALS[currentIndex].org}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4 mt-12">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Anterior"
            >
              <ChevronLeft size={18} />
            </button>
            
            {/* Dots */}
            <div className="flex space-x-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'bg-neon-purple w-4' : 'bg-zinc-800'
                  }`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-500 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Próximo"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
