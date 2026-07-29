'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowRight, RefreshCw, Check } from 'lucide-react';
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
    frontImage: '/oversized_front.jpg',
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
          className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200 group-hover:border-black transition-all duration-500"
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
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${product.frontImage})`,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            />

            {/* Back Image (rotated) */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${product.backImage})`,
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            />
            
            {/* Glow / Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </div>

          {/* Quick View Tag */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <span className="text-[10px] uppercase tracking-widest font-semibold px-3 py-1.5 bg-black text-white rounded-full">
              Ver Detalhes
            </span>
            <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              <ArrowRight size={14} />
            </span>
          </div>

          {/* Mobile Flip Button (Taps to flip the card on mobile/touch screens) */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsFlipped(!isFlipped);
            }}
            className="absolute top-3 right-3 z-35 p-2.5 bg-black/75 hover:bg-black border border-zinc-800 text-zinc-300 hover:text-white rounded-full transition-all md:hidden cursor-pointer flex items-center justify-center"
            title="Girar Card"
          >
            <RefreshCw size={10} className="text-zinc-300 animate-pulse" />
          </button>
        </div>
      </Link>

      {/* Info Block */}
      <div className="flex flex-col space-y-2 px-1 text-black">
        <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-mono">
          {product.category}
        </span>
        
        <div className="flex flex-col space-y-1">
          <Link href={`/store/${product.id}`} className="hover:text-zinc-700 transition-colors">
            <h4 className="text-sm font-bold tracking-tight leading-snug">
              {product.name}
            </h4>
          </Link>
          <span className="text-sm font-bold">
            {product.price}
          </span>
        </div>

        {/* Sizes preview buttons directly on card */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-100">
          {product.sizes.map((size) => (
            <Link
              key={size}
              href={`/store/${product.id}?size=${size}`}
              className="px-2 py-1 bg-white border border-zinc-200 hover:border-black text-[9px] font-bold rounded transition-colors text-zinc-700 hover:text-black uppercase"
            >
              {size}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function RiseStore() {
  const { products } = useApp();
  const [activeCollection, setActiveCollection] = useState('Todos');
  const [activeColor, setActiveColor] = useState('Todos');
  const [activeSize, setActiveSize] = useState('Todos');

  const collections = ['Todos', 'Oversized', 'Bonés', 'Moletons', 'Ecobags', 'Canecas'];
  const colors = ['Todos', 'Preto', 'Branco', 'Cinza', 'Off-White'];
  const sizes = ['Todos', 'P', 'M', 'G', 'GG', 'Único'];

  // Color circles mapping
  const colorMap: Record<string, string> = {
    'Preto': 'bg-black border-black',
    'Branco': 'bg-white border-zinc-300',
    'Cinza': 'bg-zinc-400 border-zinc-500',
    'Off-White': 'bg-zinc-100 border-zinc-200'
  };

  const filteredProducts = (products.length > 0 ? products : PRODUCTS).filter(p => {
    const matchCategory = activeCollection === 'Todos' || p.category === activeCollection;
    const matchColor = activeColor === 'Todos' || p.colors.includes(activeColor);
    const matchSize = activeSize === 'Todos' || p.sizes.includes(activeSize);
    return matchCategory && matchColor && matchSize;
  });

  return (
    <section id="loja" className="relative bg-white py-24 md:py-32 overflow-hidden border-t border-zinc-200 text-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 pb-6 border-b border-zinc-200">
          <div className="flex flex-col space-y-3">
            <span className="text-xs uppercase tracking-[0.4em] font-semibold text-zinc-400">
              Streetwear Label
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black uppercase font-space">
              RISE STORE<span className="text-lg md:text-2xl text-black align-super">®</span>
            </h2>
          </div>
        </div>

        {/* Two-Column Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* LEFT COLUMN: FILTERS (4 cols on md, 3 cols on lg) */}
          <aside className="md:col-span-4 lg:col-span-3 space-y-8">
            <div className="border-b border-zinc-200 pb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-black">
                Filtrar por
              </h3>
            </div>

            {/* CATEGORIES FILTER */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">
                Categorias
              </h4>
              <ul className="space-y-2">
                {collections.map(col => (
                  <li key={col}>
                    <button
                      onClick={() => setActiveCollection(col)}
                      className={`text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer flex items-center ${
                        activeCollection === col 
                          ? 'text-black font-bold' 
                          : 'text-zinc-500 hover:text-black font-light'
                      }`}
                    >
                      {activeCollection === col && <span className="w-1.5 h-1.5 bg-black mr-2 rounded-sm" />}
                      {col}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLORS FILTER */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">
                Cor
              </h4>
              <div className="flex flex-col space-y-2">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setActiveColor(color)}
                    className="flex items-center text-xs text-zinc-500 hover:text-black transition-colors cursor-pointer"
                  >
                    <div className={`w-4 h-4 rounded-md border flex items-center justify-center mr-2 shrink-0 ${
                      activeColor === color ? 'border-black' : 'border-zinc-200'
                    }`}>
                      {activeColor === color && <Check size={10} className="text-black" />}
                    </div>
                    {color !== 'Todos' && (
                      <span className={`w-3.5 h-3.5 rounded-full border mr-2 shrink-0 ${colorMap[color] || 'bg-zinc-200 border-zinc-300'}`} />
                    )}
                    <span className={activeColor === color ? 'font-semibold text-black' : 'font-light'}>{color}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SIZES FILTER */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">
                Tamanho
              </h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setActiveSize(size)}
                    className={`px-3 py-1.5 border text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${
                      activeSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-black font-normal'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: PRODUCTS LIST (8 cols on md, 9 cols on lg) */}
          <main className="md:col-span-8 lg:col-span-9">
            
            {/* Products grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-24 border border-zinc-200 rounded-2xl bg-zinc-50">
                <p className="text-zinc-400 text-xs font-mono uppercase tracking-widest">
                  Nenhum produto corresponde aos filtros selecionados.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>

        {/* Footer info message */}
        <div className="mt-24 text-center border-t border-zinc-200 pt-12 max-w-lg mx-auto">
          <p className="text-zinc-400 text-xs font-light leading-relaxed">
            Nossos produtos são desenvolvidos internamente com processos de produção lentos e exclusivos. 
            Todas as compras são finalizadas e confirmadas diretamente pelo WhatsApp para garantir um atendimento personalizado.
          </p>
        </div>

      </div>
    </section>
  );
}
