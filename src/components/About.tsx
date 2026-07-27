'use client';

import { motion } from 'framer-motion';
import { Star, CheckCircle, Compass, Heart, Zap, Layers, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const DIFFERENTIALS = [
  { name: 'Criatividade', desc: 'Soluções originais que rompem o comum.', icon: Sparkles },
  { name: 'Qualidade', desc: 'Atenção minuciosa aos detalhes e acabamentos.', icon: Layers },
  { name: 'Entrega Rápida', desc: 'Compromisso com prazos sem perder a excelência.', icon: Zap },
  { name: 'Design Premium', desc: 'Estética sofisticada inspirada em marcas globais.', icon: Compass },
  { name: 'Produção Própria', desc: 'Controle total da confecção de vestuário e brindes.', icon: CheckCircle },
  { name: 'Atendimento Personalizado', desc: 'Foco real nas necessidades específicas de cada cliente.', icon: Heart }
];

export default function About() {
  const { about } = useApp();
  return (
    <section id="sobre" className="relative bg-zinc-950 py-24 md:py-32 overflow-hidden border-t border-zinc-900">
      
      {/* Background Neon glows */}
      <div className="absolute top-1/2 left-0 w-[30vw] h-[30vw] bg-neon-pink/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-electric-blue/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main Grid: Info & CEO Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Image Block (4 cols) */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
              <img
                src={about.ceoImage}
                alt={`${about.ceoName} - CEO Rise Creative`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Photo Detail Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl glass-nav border border-white/10 flex flex-col space-y-0.5">
                <span className="text-sm font-bold text-white tracking-tight">{about.ceoName}</span>
                <span className="text-[10px] text-zinc-400 font-mono tracking-wider uppercase">
                  CEO & Diretora Criativa • {about.ceoAge} • {about.ceoLoc}
                </span>
                <span className="text-[9px] text-neon-purple font-semibold font-mono tracking-widest uppercase mt-1">
                  {about.ceoTag}
                </span>
              </div>
            </div>
          </div>

          {/* Text/Info Block (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-[0.4em] font-semibold text-neon-pink">
                Creative House
              </span>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white uppercase font-space">
                SOBRE NÓS
              </h2>
            </div>

            <p className="text-zinc-300 font-light text-base md:text-lg leading-relaxed">
              {about.story}
            </p>

            <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed">
              {about.mission}
            </p>

            {/* Statistics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-zinc-900">
              {about.stats.map((stat, idx) => {
                const Icon = stat.icon === 'Star' ? Star : null;
                return (
                  <div key={idx} className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-1">
                      <span className="text-2xl md:text-3xl font-extrabold text-white font-space">
                        {stat.value}
                      </span>
                      {Icon && <Icon size={14} className="text-neon-pink fill-neon-pink" />}
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Differentials Block */}
        <div className="mt-32 border-t border-zinc-900 pt-20">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.4em] font-semibold text-neon-purple block mb-2">
              Diferenciais
            </span>
            <h3 className="text-3xl font-bold tracking-tight text-white uppercase font-space">
              POR QUE NOS ESCOLHER?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DIFFERENTIALS.map((diff, idx) => {
              const Icon = diff.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-900 hover:border-zinc-800 hover:bg-zinc-900 transition-all duration-300 flex items-start space-x-4 group"
                >
                  <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-400 group-hover:text-neon-purple group-hover:border-neon-purple/30 transition-all shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-white tracking-tight group-hover:text-neon-purple transition-colors">
                      {diff.name}
                    </h4>
                    <p className="text-xs text-zinc-500 font-light leading-relaxed">
                      {diff.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
