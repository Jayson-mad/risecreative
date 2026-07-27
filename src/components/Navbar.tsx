'use client';

import { useState, useEffect } from 'react';
import { Search, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SEARCHABLE_ITEMS = [
  { id: 'oversized-premium', name: "Camiseta Oversized Rise Premium", category: "Streetwear", link: "/store/oversized-premium" },
  { id: 'bone-rise-streetwear', name: "Boné Strapback Classic", category: "Streetwear", link: "/store/bone-rise-streetwear" },
  { id: 'moletom-box-logo', name: "Moletom Rise Box Logo", category: "Streetwear", link: "/store/moletom-box-logo" },
  { id: 'ecobag-rise-canvas', name: "Ecobag Rise Canvas", category: "Streetwear", link: "/store/ecobag-rise-canvas" },
  { id: 'caneca-rise-glow', name: "Caneca Rise Glow", category: "Loja", link: "/store/caneca-rise-glow" },
  { id: 'flyer-digital', name: "Flyer Digital / Social Media", category: "Design", link: "#servicos" },
  { id: 'motion-flyer-premium', name: "Motion Flyer Animado", category: "Motion", link: "#servicos" },
  { id: 'branding-completo', name: "Identidade Visual & Branding", category: "Design", link: "#servicos" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof SEARCHABLE_ITEMS>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = SEARCHABLE_ITEMS.filter(
        item => item.name.toLowerCase().includes(query) || item.category.toLowerCase().includes(query)
      );
      setSearchResults(filtered);
    }
  }, [searchQuery]);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  };

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'SERVIÇOS', href: '#servicos' },
    { name: 'PORTFÓLIO', href: '#portfolio' },
    { name: 'LOJA', href: '#loja' },
    { name: 'SOBRE', href: '#sobre' },
    { name: 'CONTATO', href: '#contato' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-nav py-4 shadow-lg' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo minimalista */}
          <a href="#home" className="flex items-center hover:opacity-85 transition-opacity">
            <img 
              src="/logo.png" 
              alt="Rise Creative®" 
              className="h-8 md:h-10 w-auto object-contain"
            />
          </a>

          {/* Links para desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold tracking-widest text-zinc-400 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Ícones de ação */}
          <div className="flex items-center space-x-6">
            <button
              onClick={toggleSearch}
              aria-label="Pesquisar"
              className="text-zinc-400 hover:text-white transition-colors duration-200 cursor-pointer"
            >
              <Search size={18} />
            </button>
            <a
              href="#loja"
              aria-label="Carrinho"
              className="text-zinc-400 hover:text-white transition-colors duration-200 relative cursor-pointer"
            >
              <ShoppingBag size={18} />
              <span className="absolute -top-1.5 -right-1.5 w-2 h-2 bg-neon-pink rounded-full"></span>
            </a>
            {/* Gatilho menu mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-zinc-400 hover:text-white transition-colors duration-200"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col justify-center items-center md:hidden"
          >
            <nav className="flex flex-col space-y-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-bold tracking-widest hover:text-neon-purple transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barra/Overlay de Pesquisa Instantânea */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col pt-32 px-6 md:px-24"
          >
            <div className="max-w-4xl mx-auto w-full">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <input
                  type="text"
                  placeholder="Pesquisar oversized, camisas, bonés, logos, flyers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xl md:text-3xl font-light outline-none border-none text-white placeholder-zinc-600 font-space"
                  autoFocus
                />
                <button onClick={toggleSearch} className="text-zinc-500 hover:text-white cursor-pointer">
                  <X size={24} />
                </button>
              </div>

              {/* Resultados */}
              <div className="mt-8 overflow-y-auto max-h-[50vh] pr-2">
                {searchResults.length > 0 ? (
                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-2">Resultados</p>
                    {searchResults.map((item) => (
                      <a
                        key={item.id}
                        href={item.link}
                        onClick={toggleSearch}
                        className="group flex items-center justify-between p-4 bg-zinc-950 border border-zinc-900 rounded-lg hover:border-neon-purple transition-all"
                      >
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-neon-purple transition-colors">
                            {item.name}
                          </p>
                          <p className="text-xs text-zinc-500">{item.category}</p>
                        </div>
                        <ArrowUpRight size={18} className="text-zinc-600 group-hover:text-neon-purple group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                    ))}
                  </div>
                ) : searchQuery.trim() !== '' ? (
                  <p className="text-zinc-500 font-light">Nenhum resultado encontrado para "{searchQuery}".</p>
                ) : (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Buscas frequentes</p>
                    <div className="flex flex-wrap gap-2">
                      {['oversized', 'camisas', 'bonés', 'canecas', 'logos', 'flyers', 'branding'].map(tag => (
                        <button
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-zinc-400 hover:text-white hover:border-zinc-600 transition-all cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
