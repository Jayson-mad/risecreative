import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-900 py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
        
        {/* Left Side */}
        <div className="space-y-2">
          <span className="text-2xl font-bold tracking-[0.25em] text-white">
            RISE<span className="text-xs text-neon-purple align-super">®</span>
          </span>
          <p className="text-xs text-zinc-500 font-mono tracking-widest uppercase">
            Creative House
          </p>
        </div>

        {/* Middle Navigation Links */}
        <div className="flex flex-wrap gap-x-12 gap-y-4">
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-zinc-650 uppercase">Agência</span>
            <a href="#servicos" className="text-xs text-zinc-400 hover:text-white transition-colors">Design & Motion</a>
            <a href="#servicos" className="text-xs text-zinc-400 hover:text-white transition-colors">Branding</a>
          </div>
          <div className="flex flex-col space-y-1">
            <span className="text-[10px] font-mono tracking-widest text-zinc-650 uppercase">Confecção</span>
            <a href="#loja" className="text-xs text-zinc-400 hover:text-white transition-colors">Moda Streetwear</a>
            <a href="#loja" className="text-xs text-zinc-400 hover:text-white transition-colors">Coleção Própria</a>
          </div>
        </div>

        {/* Right Side */}
        <div className="text-left md:text-right space-y-2">
          <p className="text-xs text-zinc-500 font-light">
            © {new Date().getFullYear()} Rise Creative. Todos os direitos reservados.
          </p>
          <p className="text-[9px] text-zinc-700 tracking-widest font-mono uppercase">
            Create Beyond Limits
          </p>
        </div>

      </div>
    </footer>
  );
}
