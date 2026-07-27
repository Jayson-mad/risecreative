'use client';

import { useState, useRef } from 'react';
import { Palette, Shirt, Tag, Camera, Sparkles } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const ICONS_MAPPING: Record<string, any> = {
  studio: Palette,
  streetwear: Shirt,
  merch: Tag,
  production: Camera,
};

const STYLES_MAPPING: Record<string, { glow: string; border: string }> = {
  studio: { glow: 'rgba(139, 92, 246, 0.4)', border: 'group-hover:border-neon-purple/50' },
  streetwear: { glow: 'rgba(236, 72, 153, 0.4)', border: 'group-hover:border-neon-pink/50' },
  merch: { glow: 'rgba(59, 130, 246, 0.4)', border: 'group-hover:border-electric-blue/50' },
  production: { glow: 'rgba(255, 255, 255, 0.3)', border: 'group-hover:border-white/50' },
};

interface ServiceCardProps {
  category: {
    id: string;
    title: string;
    subtitle: string;
    items: string[];
  };
}

function ServiceCard({ category }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const styles = STYLES_MAPPING[category.id] || { glow: 'rgba(255,255,255,0.1)', border: 'group-hover:border-zinc-800' };
  const Icon = ICONS_MAPPING[category.id] || Sparkles;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Degrees of rotation
    const rX = -(mouseY / height) * 15;
    const rY = (mouseX / width) * 15;
    
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        boxShadow: rotateX !== 0 || rotateY !== 0 ? `0 20px 40px ${styles.glow}` : 'none',
      }}
      className={`group relative p-8 rounded-2xl glass border border-zinc-900 transition-all duration-200 tilt-card flex flex-col justify-between h-full hover:bg-zinc-950/80 cursor-default ${styles.border}`}
    >
      <div>
        {/* Glow behind the icon on hover */}
        <div 
          className="absolute -top-12 -left-12 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ backgroundColor: styles.glow }}
        />
        
        {/* Header card */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-zinc-600 text-xs font-mono uppercase tracking-widest">
            {category.id}
          </span>
          <Icon className="text-zinc-500 group-hover:text-white transition-colors duration-300" size={24} />
        </div>

        {/* Titles */}
        <h3 className="text-2xl font-bold tracking-tight text-white mb-1 group-hover:text-white transition-colors">
          {category.title}
        </h3>
        <p className="text-xs tracking-wider text-zinc-500 uppercase mb-8">
          {category.subtitle}
        </p>

        {/* Items List */}
        <ul className="space-y-3">
          {category.items.map((item, idx) => (
            <li key={idx} className="flex items-start text-sm text-zinc-400 font-light group-hover:text-zinc-300 transition-colors">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-neon-purple mt-2 mr-3 transition-colors shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-4 right-4 text-zinc-800 text-6xl font-black select-none pointer-events-none opacity-5 font-space group-hover:text-white group-hover:opacity-10 transition-all duration-300">
        RISE
      </div>
    </div>
  );
}

export default function Services() {
  const { services } = useApp();

  return (
    <section id="servicos" className="relative bg-black py-24 md:py-32 overflow-hidden border-t border-zinc-950">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-radial-gradient from-zinc-900/10 via-transparent to-transparent pointer-events-none blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Title */}
        <div className="flex flex-col space-y-4 mb-16 md:mb-24 max-w-2xl">
          <span className="text-xs uppercase tracking-[0.4em] font-semibold text-neon-purple">
            O que fazemos
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase font-space">
            SERVIÇOS
          </h2>
          <p className="text-zinc-500 font-light text-sm md:text-base">
            Produções criativas que elevam marcas. Unimos design sofisticado, produção têxtil moderna e identidade marcante.
          </p>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((category) => (
            <ServiceCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}
