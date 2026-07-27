'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export const PRODUCTS = [
  {
    id: 'oversized-premium',
    name: 'Camiseta Oversized Rise Premium',
    price: 'R$ 149,90',
    category: 'Oversized',
    frontImage: '/oversized_front.jpg',
    backImage: '/oversized_back.jpg',
    description: 'Camiseta oversized premium confeccionada em algodão de alta gramatura (heavyweight). Modelagem streetwear exclusiva com caimento perfeito, ombros caídos e estampa em silk de alta definição com detalhes em roxo neon na parte traseira.',
    colors: ['Preto', 'Branco'],
    sizes: ['P', 'M', 'G', 'GG'],
  },
  {
    id: 'bone-rise-streetwear',
    name: 'Boné Strapback Classic',
    price: 'R$ 89,90',
    category: 'Bonés',
    frontImage: '/oversized_front.jpg', // Reusing style for structure
    backImage: '/oversized_back.jpg',
    description: 'Boné Strapback clássico com aba curva e regulador de fivela metálica. Bordado frontal minimalista em alta definição e estampa interna personalizada.',
    colors: ['Preto'],
    sizes: ['Único'],
  },
  {
    id: 'moletom-box-logo',
    name: 'Moletom Rise Box Logo',
    price: 'R$ 279,90',
    category: 'Moletons',
    frontImage: '/oversized_front.jpg',
    backImage: '/oversized_back.jpg',
    description: 'Moletom canguru premium com capuz e cordão de ajuste. Interior flanelado extremamente macio, acabamento reforçado e estampa Box Logo Rise no peito.',
    colors: ['Preto', 'Cinza'],
    sizes: ['P', 'M', 'G', 'GG'],
  },
  {
    id: 'ecobag-rise-canvas',
    name: 'Ecobag Rise Canvas',
    price: 'R$ 59,90',
    category: 'Ecobags',
    frontImage: '/oversized_front.jpg',
    backImage: '/oversized_back.jpg',
    description: 'Sacola ecológica feita de lona de algodão cru super resistente. Estampa frontal em silk screen com lettering exclusivo Rise Creative.',
    colors: ['Off-White', 'Preto'],
    sizes: ['Único'],
  },
  {
    id: 'caneca-rise-glow',
    name: 'Caneca Rise Glow',
    price: 'R$ 49,90',
    category: 'Canecas',
    frontImage: '/oversized_front.jpg',
    backImage: '/oversized_back.jpg',
    description: 'Caneca de cerâmica preta com acabamento fosco e estampa que brilha sob luz negra/neon. Capacidade de 325ml, perfeita para café ou decoração do setup.',
    colors: ['Preto'],
    sizes: ['325ml'],
  }
];

function ProductCard({ product }: { product: typeof PRODUCTS[0] }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="flex flex-col space-y-4">
      {/* 3D Flipping Card Container */}
      <Link href={`/store/${product.id}`} className="group block cursor-pointer">
        <div
          className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#2a2a2c] border border-[#3a3a3c] group-hover:border-neon-pink/40 transition-all duration-500"
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
                backgroundImage: `url(${product.frontImage})`,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            />

            {/* Back Image (rotated) */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center backface-hidden"
              style={{
                backgroundImage: `url(${product.backImage})`,
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            />
            
            {/* Glow / Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* Quick View Tag */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <span className="text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-full text-white border border-white/10">
              Ver Detalhes
            </span>
            <span className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
              <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>

      {/* Info Block */}
      <div className="flex flex-col space-y-1 px-1">
        <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
          {product.category}
        </span>
        <div className="flex items-start justify-between">
          <Link href={`/store/${product.id}`} className="hover:text-neon-pink transition-colors">
            <h4 className="text-sm font-semibold text-white tracking-tight">
              {product.name}
            </h4>
          </Link>
          <span className="text-sm font-mono text-zinc-350 shrink-0 ml-4">
            {product.price}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function RiseStore() {
  const { products } = useApp();
  const [activeCollection, setActiveCollection] = useState('Todos');
  const collections = ['Todos', 'Oversized', 'Bonés', 'Moletons', 'Ecobags', 'Canecas'];

  const filteredProducts = activeCollection === 'Todos'
    ? products
    : products.filter(p => p.category === activeCollection);

  return (
    <section id="loja" className="relative bg-black py-24 md:py-32 overflow-hidden border-t border-zinc-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col space-y-4">
            <span className="text-xs uppercase tracking-[0.4em] font-semibold text-neon-pink">
              Streetwear Label
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white uppercase font-space">
              RISE STORE<span className="text-lg md:text-2xl text-neon-pink align-super">®</span>
            </h2>
          </div>
          
          {/* Collection Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {collections.map((col) => (
              <button
                key={col}
                onClick={() => setActiveCollection(col)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-full border transition-all duration-350 cursor-pointer ${
                  activeCollection === col
                    ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.2)]'
                    : 'bg-transparent text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-500'
                }`}
              >
                {col}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Footer info message */}
        <div className="mt-20 text-center border-t border-zinc-900 pt-12 max-w-lg mx-auto">
          <p className="text-zinc-500 text-xs font-light">
            Nossos produtos são desenvolvidos internamente com processos de produção lentos e exclusivos. 
            Todas as compras são finalizadas e confirmadas diretamente pelo WhatsApp para garantir um atendimento personalizado.
          </p>
        </div>

      </div>
    </section>
  );
}
