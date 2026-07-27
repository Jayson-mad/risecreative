'use client';

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShoppingCart, Plus, Minus, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const { products } = useApp();

  // Find the product
  const product = products.find((p) => p.id === id);

  // Fallback to first product if not found
  const activeProduct = product || products[0];

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);

  // Sync state with loaded product
  useEffect(() => {
    if (activeProduct) {
      setSelectedColor(activeProduct.colors[0] || '');
      setSelectedSize(activeProduct.sizes[0] || '');
      setActiveImage(activeProduct.frontImage || '');
      setQuantity(1);
    }
  }, [activeProduct]);

  const incrementQty = () => setQuantity((prev) => (prev < activeProduct.stock ? prev + 1 : prev));
  const decrementQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleBuy = () => {
    const text = `Olá! Gostaria de comprar este produto da Rise Store:
*Produto:* ${activeProduct.name}
*Cor:* ${selectedColor}
*Tamanho:* ${selectedSize}
*Quantidade:* ${quantity}
*Preço:* ${activeProduct.price}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/5592993398936?text=${encodedText}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 md:py-24">
      {/* Dynamic glow decoration */}
      <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] bg-neon-pink/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-neon-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Navigation Breadcrumb / Actions */}
        <div className="flex items-center justify-between mb-12 border-b border-zinc-900 pb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </button>
          
          <Link
            href="/"
            className="flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <Home size={14} />
            <span>Voltar para Home</span>
          </Link>
        </div>

        {/* Product Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Photos/Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            
            {/* Active Big Image Container with Zoom support */}
            <div
              onClick={() => setIsZoomed(!isZoomed)}
              className="relative aspect-square w-full rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-900 cursor-zoom-in"
            >
              <img
                src={activeImage}
                alt={activeProduct.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
              />
              {/* Zoom guide overlay */}
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/75 backdrop-blur-md rounded-full text-[9px] font-mono tracking-widest uppercase text-zinc-400 pointer-events-none">
                {isZoomed ? 'Clique para reduzir' : 'Clique para zoom'}
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setActiveImage(activeProduct.frontImage);
                  setIsZoomed(false);
                }}
                className={`aspect-video rounded-xl overflow-hidden border bg-zinc-950 transition-all ${
                  activeImage === activeProduct.frontImage
                    ? 'border-neon-pink'
                    : 'border-zinc-900 hover:border-zinc-800'
                }`}
              >
                <img
                  src={activeProduct.frontImage}
                  alt="Frente"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
              </button>
              
              <button
                onClick={() => {
                  setActiveImage(activeProduct.backImage);
                  setIsZoomed(false);
                }}
                className={`aspect-video rounded-xl overflow-hidden border bg-zinc-950 transition-all ${
                  activeImage === activeProduct.backImage
                    ? 'border-neon-pink'
                    : 'border-zinc-900 hover:border-zinc-800'
                }`}
              >
                <img
                  src={activeProduct.backImage}
                  alt="Costas"
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
              </button>
            </div>

          </div>

          {/* Interactive controls & purchase options (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div className="space-y-8">
              
              {/* Title, Category & Price */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.4em] font-semibold text-neon-pink font-mono block">
                  {activeProduct.category}
                </span>
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-space leading-tight">
                  {activeProduct.name}
                </h1>
                <p className="text-2xl font-mono font-bold text-zinc-300 mt-2">
                  {activeProduct.price}
                </p>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                {activeProduct.description}
              </p>

              {/* Color selector */}
              {activeProduct.colors.length > 1 && (
                <div className="space-y-3">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 block">
                    Cor
                  </span>
                  <div className="flex space-x-2">
                    {activeProduct.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-xl border transition-all cursor-pointer ${
                          selectedColor === color
                            ? 'bg-white text-black border-white'
                            : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size selector */}
              <div className="space-y-3">
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 block">
                  Tamanho
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 flex items-center justify-center text-xs font-semibold tracking-wider uppercase rounded-xl border transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'bg-neon-pink text-white border-neon-pink shadow-[0_0_15px_rgba(236,72,153,0.3)]'
                          : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500 block">
                    Quantidade
                  </span>
                  <span className={`text-[10px] font-mono tracking-wider uppercase font-semibold ${
                    activeProduct.stock > 0 ? 'text-zinc-500' : 'text-neon-pink'
                  }`}>
                    {activeProduct.stock > 0 ? `${activeProduct.stock} disponíveis` : 'Sem estoque'}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <button
                      onClick={decrementQty}
                      disabled={activeProduct.stock === 0}
                      className="px-4 py-3 text-zinc-400 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-4 text-sm font-semibold font-mono text-white min-w-[40px] text-center">
                      {activeProduct.stock > 0 ? quantity : 0}
                    </span>
                    <button
                      onClick={incrementQty}
                      disabled={activeProduct.stock === 0 || quantity >= activeProduct.stock}
                      className="px-4 py-3 text-zinc-400 hover:text-white transition-colors cursor-pointer disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Buying Action Button */}
            <div className="pt-10 border-t border-zinc-900 mt-10">
              <button
                onClick={handleBuy}
                disabled={activeProduct.stock === 0}
                className="w-full flex items-center justify-center space-x-3 py-4 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-xl hover:bg-neon-pink hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] cursor-pointer disabled:opacity-40 disabled:hover:bg-zinc-800 disabled:hover:text-zinc-500 disabled:border-zinc-800 disabled:shadow-none disabled:pointer-events-none"
              >
                <span>{activeProduct.stock > 0 ? 'Comprar no WhatsApp' : 'Esgotado'}</span>
                {activeProduct.stock > 0 && <ArrowRight size={14} />}
              </button>
              
              <p className="text-[10px] text-zinc-500 font-light text-center mt-4">
                {activeProduct.stock > 0 
                  ? 'Ao clicar, você será redirecionado para o WhatsApp com seu pedido estruturado para finalizar a compra com nossa equipe.'
                  : 'Este produto encontra-se temporariamente sem estoque. Fale com nossa equipe para encomendar.'
                }
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
