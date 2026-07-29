'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp, ProducedItem } from '@/context/AppContext';
import { X, ExternalLink, Sparkles, Tag, RefreshCw } from 'lucide-react';

function ProductionCard({ item, onClick }: { item: ProducedItem; onClick: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col space-y-4">
      {/* 3D Flipping Card Container */}
      <div 
        onClick={onClick}
        className="group block cursor-pointer"
      >
        <div
          className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#2a2a2c] border border-[#3a3a3c] group-hover:border-neon-purple/40 transition-all duration-500"
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
          style={{ perspective: '1000px' }}
        >
          {/* Card Inner Wrapper for 3D flip */}
          <div
            className="w-full h-full relative transition-transform duration-700"
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front Image */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center backface-hidden"
              style={{
                backgroundImage: `url(${item.frontImage})`,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            />

            {/* Back Image (rotated) */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center backface-hidden"
              style={{
                backgroundImage: `url(${item.backImage})`,
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            />
            
            {/* Glow / Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* Quick info overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-[9px] font-mono tracking-widest uppercase bg-black/60 backdrop-blur-md px-2 py-1 rounded text-zinc-300 border border-white/5">
              Frente / Verso
            </span>
            <span className="text-[9px] font-mono tracking-widest uppercase bg-neon-purple/80 backdrop-blur-md px-2 py-1 rounded text-white">
              Ver Detalhes
            </span>
          </div>

          {/* Mobile Flip Button (Taps to flip the card on mobile/touch screens) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFlipped(!isFlipped);
            }}
            className="absolute top-3 right-3 z-35 p-2.5 bg-black/75 hover:bg-black border border-zinc-800 hover:border-neon-purple text-zinc-300 hover:text-white rounded-full transition-all md:hidden cursor-pointer flex items-center justify-center"
            title="Girar Card"
          >
            <RefreshCw size={10} className="text-zinc-300 animate-pulse" />
          </button>

        </div>
      </div>

      {/* Basic Card Labels */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-white tracking-tight hover:text-neon-purple transition-colors cursor-pointer" onClick={onClick}>
            {item.name}
          </span>
          <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider bg-zinc-950 px-2 py-0.5 rounded border border-zinc-900 shrink-0">
            {item.category}
          </span>
        </div>
        <p className="text-[10px] text-zinc-450 font-mono tracking-wider uppercase">
          Produzido para: <span className="text-zinc-300">{item.client}</span>
        </p>
      </div>

    </div>
  );
}

export default function RiseProductions() {
  const { producedItems } = useApp();
  const [selectedItem, setSelectedItem] = useState<ProducedItem | null>(null);
  const [modalSide, setModalSide] = useState<'front' | 'back'>('front');

  const handleOpenModal = (item: ProducedItem) => {
    setSelectedItem(item);
    setModalSide('front');
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  const getWhatsappUrl = (item: ProducedItem) => {
    const text = `Olá Rayssa, vi no portfólio de Produções da Rise o item "${item.name}" (feito para ${item.client}) e gostaria de solicitar um orçamento para um projeto similar.`;
    return `https://wa.me/5592993398936?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="producoes" className="relative bg-black py-24 md:py-32 overflow-hidden border-t border-zinc-950">
      
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/4 w-[60vw] h-[60vw] bg-radial-gradient from-neon-purple/5 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col space-y-4 mb-16 md:mb-24 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.4em] font-semibold text-neon-pink flex items-center space-x-2">
            <Sparkles size={12} className="text-neon-pink mr-1" />
            <span>Showroom de Confeccionados</span>
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase font-space">
            PRODUÇÕES RISE
          </h2>
          <p className="text-zinc-500 font-light text-sm md:text-base">
            Uma seleção de camisetas oversized, moletons, bonés e acessórios premium desenvolvidos sob medida com acabamento industrial de alto padrão para nossos parceiros.
          </p>
        </div>

        {/* Grid Layout */}
        {producedItems.length === 0 ? (
          <div className="text-center py-12 border border-zinc-900 rounded-3xl bg-zinc-950/20">
            <p className="text-zinc-550 text-xs font-mono tracking-widest uppercase">Nenhum produto cadastrado no Showroom.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {producedItems.map((item) => (
              <ProductionCard 
                key={item.id} 
                item={item} 
                onClick={() => handleOpenModal(item)} 
              />
            ))}
          </div>
        )}

      </div>

      {/* DETAIL MODAL (LIGHTBOX) */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
            {/* Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer"
            />

            {/* Modal Body card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] md:max-h-none flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 z-20 p-2 bg-black/60 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white rounded-full transition-all cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Left Side: Flippable Image Viewer (1/2 size) */}
              <div className="w-full md:w-1/2 aspect-square relative bg-zinc-900 overflow-hidden flex items-center justify-center border-r border-zinc-900 shrink-0">
                <img 
                  src={modalSide === 'front' ? selectedItem.frontImage : selectedItem.backImage} 
                  alt={selectedItem.name} 
                  className="w-full h-full object-cover" 
                />

                {/* View toggler tabs on image bottom */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/5">
                  <button 
                    onClick={() => setModalSide('front')}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      modalSide === 'front' 
                        ? 'bg-white text-black font-bold' 
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Frente
                  </button>
                  <button 
                    onClick={() => setModalSide('back')}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      modalSide === 'back' 
                        ? 'bg-white text-black font-bold' 
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    Verso
                  </button>
                </div>
              </div>

              {/* Right Side: Information Block */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto">
                <div className="space-y-6">
                  
                  {/* Category / client meta */}
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neon-purple bg-neon-purple/10 px-2.5 py-1 rounded-full border border-neon-purple/20">
                      {selectedItem.category}
                    </span>
                    <span className="text-zinc-700">/</span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">
                      Showcase
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white font-space">
                      {selectedItem.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-mono">
                      Produzido sob medida para: <strong className="text-white font-normal">{selectedItem.client}</strong>
                    </p>
                  </div>

                  {/* Divider */}
                  <div className="h-[1px] bg-zinc-900 w-full" />

                  {/* Description details */}
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 block">
                      Especificações & Detalhes
                    </span>
                    <p className="text-zinc-350 text-sm font-light leading-relaxed">
                      {selectedItem.description}
                    </p>
                  </div>

                  {/* Quality Seal */}
                  <div className="flex items-start space-x-3 p-4 rounded-xl bg-zinc-900/50 border border-zinc-900">
                    <Tag size={16} className="text-neon-pink shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 block">Padrão Rise Creative®</span>
                      <p className="text-[10px] text-zinc-500 font-light">Tear de alta gramatura, encolhimento zero pré-lavado, e estampas de alta durabilidade e fixação.</p>
                    </div>
                  </div>

                </div>

                {/* Call to action (Whatsapp redirect) */}
                <div className="pt-8">
                  <a
                    href={getWhatsappUrl(selectedItem)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2 py-4 bg-white text-black hover:bg-neon-purple hover:text-white font-semibold text-xs tracking-widest uppercase rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)] cursor-pointer"
                  >
                    <span>Orçar Projeto Similar</span>
                    <ExternalLink size={14} />
                  </a>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
