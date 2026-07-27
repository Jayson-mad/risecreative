'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const CATEGORIES = [
  'Todos',
  'Design',
  'Branding',
  'Streetwear',
  'Vídeos',
  'Filmagens',
  'Eventos',
  'Motion',
  'Identidade Visual'
];

const ITEMS = [
  {
    id: 1,
    title: 'Rise Streetwear Fall/Winter',
    category: 'Streetwear',
    image: '/hero_bg_streetwear.jpg', // Reusing the high quality generated image
    description: 'Campanha de lançamento da primeira coleção oficial da Rise Store. Fotografia conceitual em estúdio com iluminação neon dramática e estética industrial.',
    year: '2026'
  },
  {
    id: 2,
    title: 'Identidade Visual - Kingdom Fest',
    category: 'Identidade Visual',
    image: '/hero_bg_streetwear.jpg', // Reusing style for structure
    description: 'Desenvolvimento de logo, guia de cores, tipografia e enxoval digital para um dos maiores festivais de música cristã da região.',
    year: '2025'
  },
  {
    id: 3,
    title: 'Motion Flyer - Conferência de Jovens',
    category: 'Motion',
    image: '/hero_bg_streetwear.jpg',
    description: 'Flyer digital animado com motion graphics sincronizados à trilha sonora. Utilizado nas redes sociais para divulgação orgânica e tráfego pago.',
    year: '2026'
  },
  {
    id: 4,
    title: 'Aftermovie Oficial - Arena Church',
    category: 'Eventos',
    image: '/hero_bg_streetwear.jpg',
    description: 'Captação e edição profissional de vídeo de cobertura para evento de 3 dias com foco em dinamismo, luz natural e transições rápidas.',
    year: '2025'
  },
  {
    id: 5,
    title: 'Logo & Branding - Nexus Digital',
    category: 'Branding',
    image: '/hero_bg_streetwear.jpg',
    description: 'Criação de logotipo conceitual minimalista e manual de marca completo para agência de tecnologia e marketing.',
    year: '2026'
  },
  {
    id: 6,
    title: 'Documentário Curto - Creative House',
    category: 'Filmagens',
    image: '/hero_bg_streetwear.jpg',
    description: 'Captação e edição estilo documentário mostrando os bastidores do processo de criação de moda streetwear e design gráfico.',
    year: '2026'
  },
  {
    id: 7,
    title: 'Projeção Panorâmica Mapeada',
    category: 'Videos', // Map to Vídeos
    image: '/hero_bg_streetwear.jpg',
    description: 'Desenvolvimento de motion graphics para projeção panorâmica em tela LED gigante de 24 metros durante evento ao vivo.',
    year: '2025'
  },
  {
    id: 8,
    title: 'Design de Camisetas - Legacy Wear',
    category: 'Design',
    image: '/hero_bg_streetwear.jpg',
    description: 'Direção de arte e ilustração vetorial exclusiva para estampas frontais e traseiras de camisetas oversized da marca Legacy.',
    year: '2026'
  }
];

export default function Portfolio() {
  const { portfolio } = useApp();
  const [filter, setFilter] = useState('Todos');
  const [activeItem, setActiveItem] = useState<typeof portfolio[0] | null>(null);

  const filteredItems = filter === 'Todos'
    ? portfolio
    : portfolio.filter(item => {
        // Handle variations (e.g. Videos / Vídeos)
        if (filter === 'Vídeos') {
          return item.category === 'Vídeos' || item.category === 'Videos';
        }
        return item.category === filter;
      });

  return (
    <section id="portfolio" className="relative bg-black py-24 md:py-32 overflow-hidden border-t border-zinc-950">
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-neon-purple/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Title Block */}
        <div className="flex flex-col space-y-4 mb-16">
          <span className="text-xs uppercase tracking-[0.4em] font-semibold text-neon-purple">
            Projetos Selecionados
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase font-space">
            PORTFÓLIO
          </h2>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full border transition-all duration-350 cursor-pointer ${
                filter === cat
                  ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                  : 'bg-transparent text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid style Pinterest with Framer Motion Layout animations */}
        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-900 hover:border-neon-purple/50 transition-all duration-300"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover overlay details */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono tracking-widest text-neon-purple uppercase">
                      {item.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">{item.year}</span>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <button
                      onClick={() => setActiveItem(item)}
                      className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-white hover:text-neon-purple transition-colors cursor-pointer"
                    >
                      <span>Ver Projeto</span>
                      <ZoomIn size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Modal Detail Display */}
        <AnimatePresence>
          {activeItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6 md:p-16"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-900 border border-zinc-800 transition-all z-50 cursor-pointer"
              >
                <X size={24} />
              </button>

              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-5xl w-full bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
              >
                {/* Image side */}
                <div className="relative aspect-video md:aspect-square bg-zinc-900 flex items-center justify-center overflow-hidden">
                  <img
                    src={activeItem.image}
                    alt={activeItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                </div>

                {/* Content Details side */}
                <div className="p-8 md:p-12 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-neon-purple/10 border border-neon-purple/20 text-neon-purple rounded-full text-xs font-mono uppercase tracking-wider">
                        {activeItem.category}
                      </span>
                      <span className="text-sm font-mono text-zinc-500">Ano: {activeItem.year}</span>
                    </div>

                    <h3 className="text-3xl font-extrabold tracking-tight text-white font-space leading-tight">
                      {activeItem.title}
                    </h3>

                    <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">
                      {activeItem.description}
                    </p>
                  </div>

                  {/* Actions footer */}
                  <div className="pt-8 border-t border-zinc-900 flex items-center justify-between">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-zinc-600 font-bold">
                      Rise Creative House
                    </span>
                    <a
                      href="https://wa.me/5592993398936?text=Olá, vi o projeto no portfólio do site e gostaria de saber mais."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-white hover:text-neon-purple transition-colors cursor-pointer"
                    >
                      <span>Entrar em contato</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
