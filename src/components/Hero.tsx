'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export default function Hero() {
  const { hero } = useApp();
  const whatsappUrl = "https://wa.me/5592993398936?text=Ol%C3%A1%2C%20encontrei%20a%20Rise%20Creative%20pelo%20site%20e%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const wordVariants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black py-20"
    >
      {/* Background Image with Dark/Neon Overlays */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-70 scale-105"
        style={{ backgroundImage: `url(${hero.bgImage})` }}
      />
      
      {/* Gradients */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-transparent to-black/80" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      
      {/* Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] bg-electric-blue/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(18,18,18,0.15)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full z-10 text-center relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center space-y-8"
        >
          {/* Brand/Subtitle */}
          <motion.div variants={itemVariants} className="overflow-hidden">
            <span className="text-xs md:text-sm font-semibold tracking-[0.4em] text-neon-pink uppercase block">
              {hero.tagline}
            </span>
          </motion.div>

          {/* Brand Logo Image instead of Text Title */}
          <motion.div
            variants={itemVariants}
            className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl select-none"
          >
            <img 
              src="/logo.png" 
              alt="Rise Creative®" 
              className="w-full h-auto object-contain mx-auto"
            />
          </motion.div>

          {/* Tags */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm md:text-lg font-space text-zinc-400 font-medium max-w-lg mt-4"
          >
            {hero.tags.map((tag, idx) => (
              <span key={tag} className="flex items-center gap-4">
                <span className="hover:text-neon-purple transition-colors duration-350 cursor-default">{tag}</span>
                {idx < hero.tags.length - 1 && <span className="text-zinc-700">•</span>}
              </span>
            ))}
          </motion.div>

          {/* Slogan */}
          <motion.div variants={itemVariants} className="text-center mt-2 max-w-md">
            <p className="text-lg font-light tracking-wide text-zinc-350 italic">
              {hero.slogan}
            </p>
            <p className="text-xs tracking-widest text-zinc-500 uppercase mt-1">
              {hero.subSlogan}
            </p>
          </motion.div>

          {/* Button CTA */}
          <motion.div variants={itemVariants} className="pt-6">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center space-x-3 px-8 py-4 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-full hover:bg-neon-purple hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] cursor-pointer"
            >
              <span>Solicitar Orçamento</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Bottom Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 z-10 opacity-50">
        <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-light">Scroll Down</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-zinc-500 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
