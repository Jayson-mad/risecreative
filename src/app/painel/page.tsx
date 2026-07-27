'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Lock, User, LogIn, LayoutDashboard, ShoppingBag, 
  FolderKanban, FileText, Settings, Plus, Edit2, 
  Trash2, LogOut, Check, X, Upload, Eye, EyeOff, AlertTriangle, Shirt, Home
} from 'lucide-react';
import { useApp, Product, PortfolioItem, ServiceCategory, ProducedItem } from '@/context/AppContext';
import Link from 'next/link';

export default function AdminPanelPage() {
  const router = useRouter();
  const { 
    products, portfolio, producedItems, services, about, hero,
    addProduct, updateProduct, deleteProduct,
    addPortfolio, updatePortfolio, deletePortfolio,
    addProducedItem, updateProducedItem, deleteProducedItem,
    updateAbout, updateServices, updateHero
  } = useApp();

  // Authentication State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authError, setAuthError] = useState('');

  // Dashboard Active Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'portfolio' | 'produced' | 'text' | 'services' | 'hero'>('overview');

  // Form States (Products)
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    category: 'Oversized',
    frontImage: '',
    backImage: '',
    description: '',
    colors: 'Preto',
    sizes: 'P, M, G, GG',
    stock: 10
  });

  // Form States (Produced Items)
  const [editingProducedId, setEditingProducedId] = useState<number | null>(null);
  const [producedForm, setProducedForm] = useState({
    name: '',
    client: '',
    category: 'Oversized',
    frontImage: '',
    backImage: '',
    description: ''
  });

  // Form States (Portfolio)
  const [editingPortfolioId, setEditingPortfolioId] = useState<number | null>(null);
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    category: 'Streetwear',
    image: '',
    description: '',
    year: '2026'
  });

  // Form States (About & CEO)
  const [aboutForm, setAboutForm] = useState({
    story: '',
    mission: '',
    ceoName: '',
    ceoAge: '',
    ceoLoc: '',
    ceoTag: '',
    ceoImage: '',
    stat1_val: '', stat1_lbl: '',
    stat2_val: '', stat2_lbl: '',
    stat3_val: '', stat3_lbl: '',
    stat4_val: '', stat4_lbl: ''
  });

  // Form States (Hero / Home)
  const [heroForm, setHeroForm] = useState({
    tagline: '',
    tags: '',
    slogan: '',
    subSlogan: '',
    bgImage: ''
  });

  // Form States (Services)
  const [servicesList, setServicesList] = useState<ServiceCategory[]>([]);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceFormItems, setServiceFormItems] = useState('');

  // Toast / Feedback
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Admin user gender profile
  const [adminUser, setAdminUser] = useState<{ name: string; gender: 'm' | 'f' }>({
    name: 'Jayson Wilgner',
    gender: 'm'
  });

  // Check login session storage on mount
  useEffect(() => {
    const session = sessionStorage.getItem('rise_admin_session');
    const storedUser = sessionStorage.getItem('rise_admin_user');
    if (session === 'true') {
      setIsLoggedIn(true);
      if (storedUser) {
        setAdminUser(JSON.parse(storedUser));
      }
    }
  }, []);

  // Sync About text data when loaded
  useEffect(() => {
    if (about) {
      setAboutForm({
        story: about.story,
        mission: about.mission,
        ceoName: about.ceoName,
        ceoAge: about.ceoAge,
        ceoLoc: about.ceoLoc,
        ceoTag: about.ceoTag,
        ceoImage: about.ceoImage,
        stat1_val: about.stats[0]?.value || '', stat1_lbl: about.stats[0]?.label || '',
        stat2_val: about.stats[1]?.value || '', stat2_lbl: about.stats[1]?.label || '',
        stat3_val: about.stats[2]?.value || '', stat3_lbl: about.stats[2]?.label || '',
        stat4_val: about.stats[3]?.value || '', stat4_lbl: about.stats[3]?.label || ''
      });
    }
  }, [about]);

  // Sync Hero data when loaded
  useEffect(() => {
    if (hero) {
      setHeroForm({
        tagline: hero.tagline,
        tags: hero.tags.join(', '),
        slogan: hero.slogan,
        subSlogan: hero.subSlogan,
        bgImage: hero.bgImage
      });
    }
  }, [hero]);

  // Sync Services list
  useEffect(() => {
    if (services) {
      setServicesList(services);
    }
  }, [services]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Auth Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const inputUser = username.toLowerCase().trim();
    let userPayload: { name: string; gender: 'm' | 'f' } = { name: 'Jayson Wilgner', gender: 'm' };
    let valid = false;

    if (inputUser === 'jayson' && password === 'rise2026') {
      userPayload = { name: 'Jayson Wilgner', gender: 'm' };
      valid = true;
    } else if (inputUser === 'rayssa' && password === 'rise2026') {
      userPayload = { name: 'Rayssa Castro', gender: 'f' };
      valid = true;
    } else if (inputUser === 'admin' && password === 'rise2026') {
      userPayload = { name: 'Jayson Wilgner', gender: 'm' };
      valid = true;
    }

    if (valid) {
      setAdminUser(userPayload);
      setIsLoggedIn(true);
      sessionStorage.setItem('rise_admin_session', 'true');
      sessionStorage.setItem('rise_admin_user', JSON.stringify(userPayload));
      setAuthError('');
      showToast(`Bem-vindo, ${userPayload.name}!`);
    } else {
      setAuthError('Usuário ou senha incorretos.');
      showToast('Erro de autenticação', 'error');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('rise_admin_session');
    sessionStorage.removeItem('rise_admin_user');
    showToast('Sessão encerrada.');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    let period = 'Bom dia';
    if (hour >= 12 && hour < 18) {
      period = 'Boa tarde';
    } else if (hour >= 18 || hour < 5) {
      period = 'Boa noite';
    }
    const prefix = adminUser.gender === 'm' ? 'Sr.' : 'Sra.';
    return `${period}, ${prefix} ${adminUser.name}`;
  };

  // Compress image before saving to local storage (prevents QuotaExceededError)
  const compressImage = (file: File, maxWidth: number = 800, maxHeight: number = 800, quality: number = 0.7): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          // Scale
          if (width > height) {
            if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            resolve(event.target?.result as string);
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);
          const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
          resolve(compressedBase64);
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  // Image Upload handler with automatic compression
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'frontImage' | 'backImage' | 'image' | 'ceoImage' | 'producedFront' | 'producedBack' | 'heroBgImage') => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      showToast('Processando e compactando imagem...');
      const base64String = await compressImage(file, 800, 800, 0.7);

      if (field === 'frontImage' || field === 'backImage') {
        setProductForm(prev => ({ ...prev, [field]: base64String }));
      } else if (field === 'image') {
        setPortfolioForm(prev => ({ ...prev, image: base64String }));
      } else if (field === 'ceoImage') {
        setAboutForm(prev => ({ ...prev, ceoImage: base64String }));
      } else if (field === 'producedFront') {
        setProducedForm(prev => ({ ...prev, frontImage: base64String }));
      } else if (field === 'producedBack') {
        setProducedForm(prev => ({ ...prev, backImage: base64String }));
      } else if (field === 'heroBgImage') {
        setHeroForm(prev => ({ ...prev, bgImage: base64String }));
      }
      showToast('Imagem carregada com sucesso!');
    } catch (error) {
      console.error('Failed to compress image', error);
      showToast('Erro ao processar imagem.', 'error');
    }
  };

  // Product Actions
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedColors = productForm.colors.split(',').map(c => c.trim()).filter(Boolean);
    const formattedSizes = productForm.sizes.split(',').map(s => s.trim()).filter(Boolean);

    const productPayload = {
      name: productForm.name,
      price: productForm.price,
      category: productForm.category,
      frontImage: productForm.frontImage || '/oversized_front.jpg',
      backImage: productForm.backImage || '/oversized_back.jpg',
      description: productForm.description,
      colors: formattedColors,
      sizes: formattedSizes,
      stock: Number(productForm.stock)
    };

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
      showToast('Produto atualizado!');
      setEditingProductId(null);
    } else {
      addProduct(productPayload);
      showToast('Novo produto cadastrado!');
    }

    // Reset Form
    setProductForm({
      name: '',
      price: '',
      category: 'Oversized',
      frontImage: '',
      backImage: '',
      description: '',
      colors: 'Preto',
      sizes: 'P, M, G, GG',
      stock: 10
    });
  };

  const handleEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProductForm({
      name: p.name,
      price: p.price,
      category: p.category,
      frontImage: p.frontImage,
      backImage: p.backImage,
      description: p.description,
      colors: p.colors.join(', '),
      sizes: p.sizes.join(', '),
      stock: p.stock
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Tem certeza que deseja excluir este produto?')) {
      deleteProduct(id);
      showToast('Produto removido.');
    }
  };

  // Portfolio Actions
  const handlePortfolioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: portfolioForm.title,
      category: portfolioForm.category,
      image: portfolioForm.image || '/hero_bg_streetwear.jpg',
      description: portfolioForm.description,
      year: portfolioForm.year
    };

    if (editingPortfolioId !== null) {
      updatePortfolio(editingPortfolioId, payload);
      showToast('Projeto atualizado!');
      setEditingPortfolioId(null);
    } else {
      addPortfolio(payload);
      showToast('Novo projeto adicionado!');
    }

    setPortfolioForm({
      title: '',
      category: 'Streetwear',
      image: '',
      description: '',
      year: '2026'
    });
  };

  const handleEditPortfolio = (item: PortfolioItem) => {
    setEditingPortfolioId(item.id);
    setPortfolioForm({
      title: item.title,
      category: item.category,
      image: item.image,
      description: item.description,
      year: item.year
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeletePortfolio = (id: number) => {
    if (confirm('Tem certeza que deseja excluir este item do portfólio?')) {
      deletePortfolio(id);
      showToast('Item removido do portfólio.');
    }
  };

  // Produced Items Actions
  const handleProducedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: producedForm.name,
      client: producedForm.client,
      category: producedForm.category,
      frontImage: producedForm.frontImage || '/oversized_front.jpg',
      backImage: producedForm.backImage || '/oversized_back.jpg',
      description: producedForm.description
    };

    if (editingProducedId !== null) {
      updateProducedItem(editingProducedId, payload);
      showToast('Item produzido atualizado!');
      setEditingProducedId(null);
    } else {
      addProducedItem(payload);
      showToast('Novo item produzido adicionado!');
    }

    setProducedForm({
      name: '',
      client: '',
      category: 'Oversized',
      frontImage: '',
      backImage: '',
      description: ''
    });
  };

  const handleEditProduced = (item: ProducedItem) => {
    setEditingProducedId(item.id);
    setProducedForm({
      name: item.name,
      client: item.client,
      category: item.category,
      frontImage: item.frontImage,
      backImage: item.backImage,
      description: item.description
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProduced = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta produção do showroom?')) {
      deleteProducedItem(id);
      showToast('Produção removida.');
    }
  };

  // About/Stats Actions
  const handleAboutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      story: aboutForm.story,
      mission: aboutForm.mission,
      ceoName: aboutForm.ceoName,
      ceoAge: aboutForm.ceoAge,
      ceoLoc: aboutForm.ceoLoc,
      ceoTag: aboutForm.ceoTag,
      ceoImage: aboutForm.ceoImage,
      stats: [
        { value: aboutForm.stat1_val, label: aboutForm.stat1_lbl },
        { value: aboutForm.stat2_val, label: aboutForm.stat2_lbl },
        { value: aboutForm.stat3_val, label: aboutForm.stat3_lbl, icon: 'Star' },
        { value: aboutForm.stat4_val, label: aboutForm.stat4_lbl }
      ]
    };

    updateAbout(payload);
    showToast('Textos institucionais atualizados!');
  };

  // Hero Actions
  const handleHeroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedTags = heroForm.tags.split(',').map(t => t.trim()).filter(Boolean);
    updateHero({
      tagline: heroForm.tagline,
      tags: formattedTags,
      slogan: heroForm.slogan,
      subSlogan: heroForm.subSlogan,
      bgImage: heroForm.bgImage
    });
    showToast('Informações da Home atualizadas!');
  };

  // Services Actions
  const handleEditServiceClick = (cat: ServiceCategory) => {
    setEditingServiceId(cat.id);
    setServiceFormItems(cat.items.join('\n'));
  };

  const handleServiceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingServiceId) return;

    const splitItems = serviceFormItems.split('\n').map(i => i.trim()).filter(Boolean);
    const updated = servicesList.map(cat => 
      cat.id === editingServiceId ? { ...cat, items: splitItems } : cat
    );

    updateServices(updated);
    setServicesList(updated);
    setEditingServiceId(null);
    setServiceFormItems('');
    showToast('Lista de serviços atualizada!');
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-neon-purple selection:text-white">
      
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl border backdrop-blur-md shadow-2xl flex items-center space-x-3 transition-all ${
          toast.type === 'success' 
            ? 'bg-zinc-900/90 border-neon-purple text-white' 
            : 'bg-zinc-900/90 border-neon-pink text-white'
        }`}>
          {toast.type === 'success' ? <Check size={18} className="text-neon-purple" /> : <X size={18} className="text-neon-pink" />}
          <span className="text-xs font-semibold tracking-wider uppercase font-mono">{toast.message}</span>
        </div>
      )}

      {/* LOGIN SCREEN */}
      {!isLoggedIn ? (
        <div className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] bg-neon-purple/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[25vw] h-[25vw] bg-neon-pink/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="w-full max-w-md glass border border-zinc-900 rounded-3xl p-8 md:p-12 space-y-8 relative z-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            <div className="flex flex-col items-center space-y-3">
              <img 
                src="/logo.png" 
                alt="Rise Creative®" 
                className="h-10 w-auto object-contain"
              />
              <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">
                Painel de Controle
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {authError && (
                <div className="p-3 bg-neon-pink/10 border border-neon-pink/20 rounded-xl flex items-center space-x-2 text-xs text-neon-pink font-light">
                  <AlertTriangle size={14} className="shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Usuário</label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 text-zinc-600" size={16} />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="jayson, rayssa ou admin"
                    className="w-full pl-12 pr-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-700 focus:border-neon-purple focus:outline-none transition-all text-sm font-light"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">Senha</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 text-zinc-600" size={16} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-12 pr-12 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-700 focus:border-neon-purple focus:outline-none transition-all text-sm font-light"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 text-zinc-650 hover:text-zinc-400 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-4 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-xl hover:bg-neon-purple hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] cursor-pointer"
              >
                <span>Acessar Painel</span>
                <LogIn size={14} />
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* ADMIN DASHBOARD */
        <div className="flex flex-col min-h-screen">
          
          {/* Header Dashboard Nav */}
          <header className="glass-nav py-4 border-b border-zinc-900 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center hover:opacity-85 transition-opacity">
                  <img 
                    src="/logo.png" 
                    alt="Rise Creative®" 
                    className="h-6 md:h-7 w-auto object-contain"
                  />
                </Link>
                <span className="text-zinc-700">|</span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-450 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full">
                  ADMIN DASHBOARD
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-xs font-semibold tracking-wider uppercase text-zinc-400 hover:text-neon-pink transition-colors cursor-pointer"
              >
                <LogOut size={14} />
                <span>Sair</span>
              </button>
            </div>
          </header>

          <div className="flex-grow max-w-7xl w-full mx-auto px-6 md:px-12 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar Controls (3 cols) */}
            <aside className="lg:col-span-3 flex flex-col space-y-2">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center space-x-3 px-5 py-4 rounded-xl text-xs font-semibold tracking-wider uppercase border transition-all cursor-pointer ${
                  activeTab === 'overview'
                    ? 'bg-white text-black border-white shadow-[0_5px_15px_rgba(255,255,255,0.1)]'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <LayoutDashboard size={16} />
                <span>Visão Geral</span>
              </button>

              <button
                onClick={() => setActiveTab('hero')}
                className={`w-full flex items-center space-x-3 px-5 py-4 rounded-xl text-xs font-semibold tracking-wider uppercase border transition-all cursor-pointer ${
                  activeTab === 'hero'
                    ? 'bg-white text-black border-white shadow-[0_5px_15px_rgba(255,255,255,0.1)]'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <Home size={16} />
                <span>Hero / Home</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center space-x-3 px-5 py-4 rounded-xl text-xs font-semibold tracking-wider uppercase border transition-all cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-white text-black border-white shadow-[0_5px_15px_rgba(255,255,255,0.1)]'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <ShoppingBag size={16} />
                <span>Rise Store / Estoque</span>
              </button>

              <button
                onClick={() => setActiveTab('portfolio')}
                className={`w-full flex items-center space-x-3 px-5 py-4 rounded-xl text-xs font-semibold tracking-wider uppercase border transition-all cursor-pointer ${
                  activeTab === 'portfolio'
                    ? 'bg-white text-black border-white shadow-[0_5px_15px_rgba(255,255,255,0.1)]'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <FolderKanban size={16} />
                <span>Portfólio</span>
              </button>

              <button
                onClick={() => setActiveTab('produced')}
                className={`w-full flex items-center space-x-3 px-5 py-4 rounded-xl text-xs font-semibold tracking-wider uppercase border transition-all cursor-pointer ${
                  activeTab === 'produced'
                    ? 'bg-white text-black border-white shadow-[0_5px_15px_rgba(255,255,255,0.1)]'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <Shirt size={16} />
                <span>Produções</span>
              </button>

              <button
                onClick={() => setActiveTab('text')}
                className={`w-full flex items-center space-x-3 px-5 py-4 rounded-xl text-xs font-semibold tracking-wider uppercase border transition-all cursor-pointer ${
                  activeTab === 'text'
                    ? 'bg-white text-black border-white shadow-[0_5px_15px_rgba(255,255,255,0.1)]'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <FileText size={16} />
                <span>Textos & CEO</span>
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center space-x-3 px-5 py-4 rounded-xl text-xs font-semibold tracking-wider uppercase border transition-all cursor-pointer ${
                  activeTab === 'services'
                    ? 'bg-white text-black border-white shadow-[0_5px_15px_rgba(255,255,255,0.1)]'
                    : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-800 hover:text-white'
                }`}
              >
                <Settings size={16} />
                <span>Serviços</span>
              </button>
            </aside>

            {/* Main Content Area (9 cols) */}
            <main className="lg:col-span-9 bg-zinc-950 border border-zinc-900 rounded-3xl p-6 md:p-8 space-y-8 min-h-[60vh] shadow-xl">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-neon-purple font-semibold">
                      {getGreeting()}
                    </span>
                    <h2 className="text-xl font-bold text-white uppercase font-space tracking-tight">Visão Geral</h2>
                    <p className="text-zinc-500 text-xs font-light">Status consolidado dos componentes dinâmicos do site.</p>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                      <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 block">Produtos Loja</span>
                      <span className="text-4xl font-extrabold text-white font-space block">{products.length}</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                      <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 block">Itens no Portfólio</span>
                      <span className="text-4xl font-extrabold text-white font-space block">{portfolio.length}</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                      <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 block">Produções Realizadas</span>
                      <span className="text-4xl font-extrabold text-white font-space block">{producedItems.length}</span>
                    </div>

                    <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                      <span className="text-xs uppercase font-mono tracking-widest text-zinc-500 block">Total em Estoque</span>
                      <span className="text-4xl font-extrabold text-white font-space block">
                        {products.reduce((acc, p) => acc + p.stock, 0)} pcs
                      </span>
                    </div>
                  </div>

                  {/* Troubleshooting Reset Button */}
                  <div className="p-6 rounded-2xl bg-neon-pink/5 border border-neon-pink/15 space-y-4">
                    <h3 className="text-sm font-semibold text-neon-pink tracking-tight flex items-center">
                      <AlertTriangle size={16} className="mr-2" />
                      Solução de Problemas: Erro de Armazenamento Excedido (QuotaExceededError)
                    </h3>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      Se você enviou imagens muito pesadas anteriormente e o site está dando erro ao salvar modificações (limite do navegador atingido), você pode limpar o armazenamento local para restaurar os dados originais limpos. 
                      Isso redefinirá os produtos e produções originais e liberará espaço.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm("Tem certeza que deseja resetar todas as alterações do site para as configurações originais? Isso limpará todas as fotos enviadas.")) {
                          localStorage.clear();
                          sessionStorage.clear();
                          window.location.reload();
                        }
                      }}
                      className="px-4 py-2 bg-neon-pink/20 hover:bg-neon-pink/40 border border-neon-pink/30 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Resetar Dados Locais
                    </button>
                  </div>
                </div>
              )}

              {/* TAB: HERO / HOME MANAGER */}
              {activeTab === 'hero' && (
                <div className="space-y-8">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-white uppercase font-space tracking-tight">Editar Home Screen</h2>
                    <p className="text-zinc-500 text-xs font-light">Customize os slogans, tags e imagem de fundo da tela inicial (Hero Section).</p>
                  </div>

                  <form onSubmit={handleHeroSubmit} className="space-y-6 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Subtítulo Superior</label>
                        <input
                          type="text"
                          value={heroForm.tagline}
                          onChange={(e) => setHeroForm(prev => ({ ...prev, tagline: e.target.value }))}
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 text-white text-xs rounded-xl focus:border-neon-purple outline-none transition-colors"
                          placeholder="Ex: Creative House"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Tags de Especialidades (separadas por vírgula)</label>
                        <input
                          type="text"
                          value={heroForm.tags}
                          onChange={(e) => setHeroForm(prev => ({ ...prev, tags: e.target.value }))}
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 text-white text-xs rounded-xl focus:border-neon-purple outline-none transition-colors"
                          placeholder="Ex: Design, Branding, Streetwear, Motion"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Slogan em Inglês</label>
                        <input
                          type="text"
                          value={heroForm.slogan}
                          onChange={(e) => setHeroForm(prev => ({ ...prev, slogan: e.target.value }))}
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 text-white text-xs rounded-xl focus:border-neon-purple outline-none transition-colors"
                          placeholder="Ex: 'Create Beyond Limits'"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Slogan Traduzido / Subtítulo</label>
                        <input
                          type="text"
                          value={heroForm.subSlogan}
                          onChange={(e) => setHeroForm(prev => ({ ...prev, subSlogan: e.target.value }))}
                          className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 text-white text-xs rounded-xl focus:border-neon-purple outline-none transition-colors"
                          placeholder="Ex: Criamos além dos limites."
                          required
                        />
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Imagem de Fundo do Hero (Gigante)</label>
                        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                          <div className="w-full sm:w-48 h-28 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center shrink-0">
                            {heroForm.bgImage ? (
                              <img src={heroForm.bgImage} alt="Fundo Hero" className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-[10px] text-zinc-650 font-mono">Sem Imagem</span>
                            )}
                          </div>
                          <div className="flex-grow w-full">
                            <label className="w-full flex flex-col items-center justify-center px-4 py-6 bg-zinc-950 border border-zinc-800 border-dashed rounded-xl hover:border-neon-purple transition-colors cursor-pointer text-center">
                              <Upload size={20} className="text-zinc-500 mb-1" />
                              <span className="text-[10px] text-zinc-400 font-semibold uppercase tracking-wider">Fazer Upload de Nova Foto</span>
                              <span className="text-[9px] text-zinc-600 mt-0.5">JPEG, PNG (Max 800px, compressão ativa)</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, 'heroBgImage')}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      </div>

                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-xl hover:bg-neon-purple hover:text-white transition-all cursor-pointer"
                      >
                        Salvar Informações da Home
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* TAB 2: PRODUCTS MANAGER */}
              {activeTab === 'products' && (
                <div className="space-y-10">
                  
                  {/* Form to Add/Edit */}
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold text-white uppercase font-space tracking-tight">
                        {editingProductId ? 'Editar Produto' : 'Cadastrar Novo Produto'}
                      </h2>
                      <p className="text-zinc-500 text-xs font-light">
                        Preencha os dados e anexe as fotos de frente e costas do produto.
                      </p>
                    </div>

                    <form onSubmit={handleProductSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                      
                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Nome do Produto</label>
                        <input
                          type="text"
                          required
                          value={productForm.name}
                          onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Ex: Camiseta Oversized Acid"
                          className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-800 focus:border-neon-purple focus:outline-none transition-all text-xs font-light"
                        />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Preço (Formatado)</label>
                        <input
                          type="text"
                          required
                          value={productForm.price}
                          onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                          placeholder="Ex: R$ 149,90"
                          className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-800 focus:border-neon-purple focus:outline-none transition-all text-xs font-light"
                        />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Categoria</label>
                        <select
                          value={productForm.category}
                          onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                          className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white focus:border-neon-purple focus:outline-none transition-all text-xs font-light"
                        >
                          <option value="Oversized">Oversized</option>
                          <option value="Bonés">Bonés</option>
                          <option value="Moletons">Moletons</option>
                          <option value="Ecobags">Ecobags</option>
                          <option value="Canecas">Canecas</option>
                        </select>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Estoque Inicial</label>
                        <input
                          type="number"
                          required
                          min={0}
                          value={productForm.stock}
                          onChange={(e) => setProductForm(prev => ({ ...prev, stock: Number(e.target.value) }))}
                          className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white focus:border-neon-purple focus:outline-none transition-all text-xs font-light"
                        />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Cores (separadas por vírgula)</label>
                        <input
                          type="text"
                          value={productForm.colors}
                          onChange={(e) => setProductForm(prev => ({ ...prev, colors: e.target.value }))}
                          placeholder="Ex: Preto, Branco, Cinza"
                          className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-800 focus:border-neon-purple focus:outline-none transition-all text-xs font-light"
                        />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Tamanhos (separados por vírgula)</label>
                        <input
                          type="text"
                          value={productForm.sizes}
                          onChange={(e) => setProductForm(prev => ({ ...prev, sizes: e.target.value }))}
                          placeholder="Ex: P, M, G, GG"
                          className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-800 focus:border-neon-purple focus:outline-none transition-all text-xs font-light"
                        />
                      </div>

                      <div className="flex flex-col space-y-2 sm:col-span-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Descrição do Produto</label>
                        <textarea
                          required
                          rows={3}
                          value={productForm.description}
                          onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Descrição detalhada sobre tecido, acabamento..."
                          className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-800 focus:border-neon-purple focus:outline-none transition-all text-xs font-light resize-none"
                        />
                      </div>

                      {/* Image Uploads */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Foto Frente (Arquivo ou URL)</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'frontImage')}
                            className="hidden"
                            id="upload-front"
                          />
                          <label
                            htmlFor="upload-front"
                            className="flex items-center space-x-2 px-4 py-3 bg-zinc-950 border border-zinc-900 hover:border-neon-purple rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-all cursor-pointer"
                          >
                            <Upload size={14} />
                            <span>Upload Imagem</span>
                          </label>
                          {productForm.frontImage && (
                            <span className="text-[10px] text-neon-purple font-mono">Pronta</span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Foto Costas (Arquivo ou URL)</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'backImage')}
                            className="hidden"
                            id="upload-back"
                          />
                          <label
                            htmlFor="upload-back"
                            className="flex items-center space-x-2 px-4 py-3 bg-zinc-950 border border-zinc-900 hover:border-neon-purple rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-all cursor-pointer"
                          >
                            <Upload size={14} />
                            <span>Upload Imagem</span>
                          </label>
                          {productForm.backImage && (
                            <span className="text-[10px] text-neon-purple font-mono">Pronta</span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2 pt-4 flex space-x-3">
                        <button
                          type="submit"
                          className="px-6 py-3 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-xl hover:bg-neon-purple hover:text-white transition-all cursor-pointer"
                        >
                          {editingProductId ? 'Salvar Alterações' : 'Cadastrar Produto'}
                        </button>
                        {editingProductId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProductId(null);
                              setProductForm({
                                name: '',
                                price: '',
                                category: 'Oversized',
                                frontImage: '',
                                backImage: '',
                                description: '',
                                colors: 'Preto',
                                sizes: 'P, M, G, GG',
                                stock: 10
                              });
                            }}
                            className="px-6 py-3 bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700 rounded-xl text-xs font-semibold tracking-widest uppercase cursor-pointer"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>

                    </form>
                  </div>

                  {/* List/Table of Products */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Produtos Listados</h3>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-zinc-900 text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                            <th className="py-4 px-2">Produto</th>
                            <th className="py-4 px-2">Categoria</th>
                            <th className="py-4 px-2">Preço</th>
                            <th className="py-4 px-2">Estoque</th>
                            <th className="py-4 px-2 text-right">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                          {products.map((p) => (
                            <tr key={p.id} className="text-xs group hover:bg-zinc-900/30 transition-colors">
                              <td className="py-4 px-2 font-medium text-white flex items-center space-x-3">
                                <div className="w-8 h-8 rounded bg-zinc-900 overflow-hidden border border-zinc-800 shrink-0">
                                  <img src={p.frontImage} alt="" className="w-full h-full object-cover" />
                                </div>
                                <span>{p.name}</span>
                              </td>
                              <td className="py-4 px-2 text-zinc-400">{p.category}</td>
                              <td className="py-4 px-2 font-mono text-zinc-350">{p.price}</td>
                              <td className="py-4 px-2 font-mono">
                                <span className={`px-2 py-1 rounded text-[10px] ${
                                  p.stock > 0 
                                    ? 'bg-zinc-900 text-zinc-400' 
                                    : 'bg-neon-pink/10 text-neon-pink border border-neon-pink/20 font-bold'
                                }`}>
                                  {p.stock > 0 ? `${p.stock} un` : 'Esgotado'}
                                </span>
                              </td>
                              <td className="py-4 px-2 text-right space-x-2">
                                <button
                                  onClick={() => handleEditProduct(p)}
                                  className="p-2 text-zinc-550 hover:text-neon-purple hover:bg-zinc-900 rounded transition-colors cursor-pointer"
                                  title="Editar"
                                >
                                  <Edit2 size={14} />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(p.id)}
                                  className="p-2 text-zinc-550 hover:text-neon-pink hover:bg-zinc-900 rounded transition-colors cursor-pointer"
                                  title="Excluir"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3: PORTFOLIO MANAGER */}
              {activeTab === 'portfolio' && (
                <div className="space-y-10">
                  
                  {/* Form to Add/Edit */}
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold text-white uppercase font-space tracking-tight">
                        {editingPortfolioId !== null ? 'Editar Projeto' : 'Adicionar Novo Projeto'}
                      </h2>
                      <p className="text-zinc-500 text-xs font-light">
                        Cadastre novas fotos de captação de eventos ou designs produzidos.
                      </p>
                    </div>

                    <form onSubmit={handlePortfolioSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                      
                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Título do Projeto</label>
                        <input
                          type="text"
                          required
                          value={portfolioForm.title}
                          onChange={(e) => setPortfolioForm(prev => ({ ...prev, title: e.target.value }))}
                          placeholder="Ex: Identidade Youth Conference"
                          className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-800 focus:border-neon-purple focus:outline-none transition-all text-xs font-light"
                        />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Categoria</label>
                        <select
                          value={portfolioForm.category}
                          onChange={(e) => setPortfolioForm(prev => ({ ...prev, category: e.target.value }))}
                          className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white focus:border-neon-purple focus:outline-none transition-all text-xs font-light"
                        >
                          <option value="Design">Design</option>
                          <option value="Branding">Branding</option>
                          <option value="Streetwear">Streetwear</option>
                          <option value="Vídeos">Vídeos</option>
                          <option value="Filmagens">Filmagens</option>
                          <option value="Eventos">Eventos</option>
                          <option value="Motion">Motion</option>
                          <option value="Identidade Visual">Identidade Visual</option>
                        </select>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Ano</label>
                        <input
                          type="text"
                          required
                          value={portfolioForm.year}
                          onChange={(e) => setPortfolioForm(prev => ({ ...prev, year: e.target.value }))}
                          placeholder="2026"
                          className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-800 focus:border-neon-purple focus:outline-none transition-all text-xs font-light"
                        />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Foto do Projeto</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'image')}
                            className="hidden"
                            id="upload-portfolio"
                          />
                          <label
                            htmlFor="upload-portfolio"
                            className="flex items-center space-x-2 px-4 py-3 bg-zinc-950 border border-zinc-900 hover:border-neon-purple rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-all cursor-pointer"
                          >
                            <Upload size={14} />
                            <span>Upload Imagem</span>
                          </label>
                          {portfolioForm.image && (
                            <span className="text-[10px] text-neon-purple font-mono">Pronta</span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2 sm:col-span-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Descrição do Projeto</label>
                        <textarea
                          required
                          rows={3}
                          value={portfolioForm.description}
                          onChange={(e) => setPortfolioForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Explique o conceito criativo..."
                          className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-800 focus:border-neon-purple focus:outline-none transition-all text-xs font-light resize-none"
                        />
                      </div>

                      <div className="sm:col-span-2 pt-4 flex space-x-3">
                        <button
                          type="submit"
                          className="px-6 py-3 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-xl hover:bg-neon-purple hover:text-white transition-all cursor-pointer"
                        >
                          {editingPortfolioId !== null ? 'Salvar Alterações' : 'Adicionar Projeto'}
                        </button>
                        {editingPortfolioId !== null && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingPortfolioId(null);
                              setPortfolioForm({
                                title: '',
                                category: 'Streetwear',
                                image: '',
                                description: '',
                                year: '2026'
                              });
                            }}
                            className="px-6 py-3 bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700 rounded-xl text-xs font-semibold tracking-widest uppercase cursor-pointer"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>

                    </form>
                  </div>

                  {/* List of Portfolio items */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Projetos Cadastrados</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {portfolio.map((item) => (
                        <div key={item.id} className="p-4 bg-zinc-900 border border-zinc-850 rounded-xl flex items-start space-x-4">
                          <div className="w-16 h-16 rounded bg-zinc-950 border border-zinc-800 overflow-hidden shrink-0">
                            <img src={item.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.category} • {item.year}</p>
                            <p className="text-[10px] text-zinc-450 truncate mt-1">{item.description}</p>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <button
                              onClick={() => handleEditPortfolio(item)}
                              className="p-1.5 text-zinc-500 hover:text-neon-purple hover:bg-zinc-950 rounded transition-colors cursor-pointer"
                            >
                              <Edit2 size={12} />
                            </button>
                            <button
                              onClick={() => handleDeletePortfolio(item.id)}
                              className="p-1.5 text-zinc-500 hover:text-neon-pink hover:bg-zinc-950 rounded transition-colors cursor-pointer"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 3.5: PRODUÇÕES CONFECCIONADAS */}
              {activeTab === 'produced' && (
                <div className="space-y-10">
                  
                  {/* Form to Add/Edit */}
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold text-white uppercase font-space tracking-tight">
                        {editingProducedId !== null ? 'Editar Produção' : 'Cadastrar Produção Confeccionada'}
                      </h2>
                      <p className="text-zinc-500 text-xs font-light">
                        Cadastre itens já confeccionados para a vitrine (com efeito 3D frente/costas).
                      </p>
                    </div>

                    <form onSubmit={handleProducedSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 rounded-2xl bg-zinc-900 border border-zinc-800">
                      
                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Nome do Produto</label>
                        <input
                          type="text"
                          required
                          value={producedForm.name}
                          onChange={(e) => setProducedForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Ex: Camiseta Oversized Arena Conference"
                          className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-800 focus:border-neon-purple focus:outline-none transition-all text-xs font-light"
                        />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Cliente / Destinatário</label>
                        <input
                          type="text"
                          required
                          value={producedForm.client}
                          onChange={(e) => setProducedForm(prev => ({ ...prev, client: e.target.value }))}
                          placeholder="Ex: Arena Church Jovens"
                          className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-800 focus:border-neon-purple focus:outline-none transition-all text-xs font-light"
                        />
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Categoria</label>
                        <select
                          value={producedForm.category}
                          onChange={(e) => setProducedForm(prev => ({ ...prev, category: e.target.value }))}
                          className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white focus:border-neon-purple focus:outline-none transition-all text-xs font-light"
                        >
                          <option value="Oversized">Oversized</option>
                          <option value="Moletons">Moletons</option>
                          <option value="Bonés">Bonés</option>
                          <option value="Ecobags">Ecobags</option>
                          <option value="Canecas">Canecas</option>
                          <option value="Acessórios">Acessórios</option>
                        </select>
                      </div>

                      <div className="flex flex-col space-y-2" />

                      <div className="flex flex-col space-y-2 sm:col-span-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Especificações do Acabamento</label>
                        <textarea
                          required
                          rows={3}
                          value={producedForm.description}
                          onChange={(e) => setProducedForm(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Detalhes sobre malha, estamparia (silk screen, relevo, bordado)..."
                          className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white placeholder-zinc-800 focus:border-neon-purple focus:outline-none transition-all text-xs font-light resize-none"
                        />
                      </div>

                      {/* Image Uploads */}
                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Foto Frente (Arquivo)</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'producedFront')}
                            className="hidden"
                            id="upload-produced-front"
                          />
                          <label
                            htmlFor="upload-produced-front"
                            className="flex items-center space-x-2 px-4 py-3 bg-zinc-950 border border-zinc-900 hover:border-neon-purple rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-all cursor-pointer"
                          >
                            <Upload size={14} />
                            <span>Upload Imagem</span>
                          </label>
                          {producedForm.frontImage && (
                            <span className="text-[10px] text-neon-purple font-mono">Pronta</span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Foto Costas (Arquivo)</label>
                        <div className="flex items-center space-x-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e, 'producedBack')}
                            className="hidden"
                            id="upload-produced-back"
                          />
                          <label
                            htmlFor="upload-produced-back"
                            className="flex items-center space-x-2 px-4 py-3 bg-zinc-950 border border-zinc-900 hover:border-neon-purple rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-all cursor-pointer"
                          >
                            <Upload size={14} />
                            <span>Upload Imagem</span>
                          </label>
                          {producedForm.backImage && (
                            <span className="text-[10px] text-neon-purple font-mono">Pronta</span>
                          )}
                        </div>
                      </div>

                      <div className="sm:col-span-2 pt-4 flex space-x-3">
                        <button
                          type="submit"
                          className="px-6 py-3 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-xl hover:bg-neon-purple hover:text-white transition-all cursor-pointer"
                        >
                          {editingProducedId !== null ? 'Salvar Alterações' : 'Cadastrar Produção'}
                        </button>
                        {editingProducedId !== null && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProducedId(null);
                              setProducedForm({
                                name: '',
                                client: '',
                                category: 'Oversized',
                                frontImage: '',
                                backImage: '',
                                description: ''
                              });
                            }}
                            className="px-6 py-3 bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700 rounded-xl text-xs font-semibold tracking-widest uppercase cursor-pointer"
                          >
                            Cancelar
                          </button>
                        )}
                      </div>

                    </form>
                  </div>

                  {/* List of Produced Items */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">Produções no Showroom</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {producedItems.map((item) => (
                        <div key={item.id} className="p-4 bg-zinc-900 border border-zinc-850 rounded-xl flex items-start space-x-4">
                          <div className="w-16 h-16 rounded bg-zinc-950 border border-zinc-800 overflow-hidden shrink-0">
                            <img src={item.frontImage} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-grow min-w-0">
                            <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{item.category} • Cliente: {item.client}</p>
                            <p className="text-[10px] text-zinc-450 truncate mt-1">{item.description}</p>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <button
                              onClick={() => handleEditProduced(item)}
                              className="p-1.5 text-zinc-500 hover:text-neon-purple hover:bg-zinc-950 rounded transition-colors cursor-pointer"
                            >
                              <Edit2 size={12} />
                            </button>
                            <button
                              onClick={() => handleDeleteProduced(item.id)}
                              className="p-1.5 text-zinc-500 hover:text-neon-pink hover:bg-zinc-950 rounded transition-colors cursor-pointer"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 4: TEXTS & CEO */}
              {activeTab === 'text' && (
                <div className="space-y-6">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-white uppercase font-space tracking-tight">Textos Institucionais & CEO</h2>
                    <p className="text-zinc-500 text-xs font-light">Altere as biografias e métricas de destaque do site.</p>
                  </div>

                  <form onSubmit={handleAboutSubmit} className="space-y-6 p-6 bg-zinc-900 border border-zinc-800 rounded-2xl">
                    
                    <div className="flex flex-col space-y-2">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">História (Seção Sobre Nós - Primeiro Parágrafo)</label>
                      <textarea
                        required
                        rows={3}
                        value={aboutForm.story}
                        onChange={(e) => setAboutForm(prev => ({ ...prev, story: e.target.value }))}
                        className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white focus:border-neon-purple focus:outline-none transition-all text-xs font-light resize-none"
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Missão & Princípios (Segundo Parágrafo)</label>
                      <textarea
                        required
                        rows={4}
                        value={aboutForm.mission}
                        onChange={(e) => setAboutForm(prev => ({ ...prev, mission: e.target.value }))}
                        className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white focus:border-neon-purple focus:outline-none transition-all text-xs font-light resize-none"
                      />
                    </div>

                    {/* CEO Bio */}
                    <div className="border-t border-zinc-800 pt-6 space-y-6">
                      <h3 className="text-xs uppercase font-mono tracking-widest text-zinc-400">Biografia da CEO</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-2">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Nome da CEO</label>
                          <input
                            type="text"
                            required
                            value={aboutForm.ceoName}
                            onChange={(e) => setAboutForm(prev => ({ ...prev, ceoName: e.target.value }))}
                            className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white focus:border-neon-purple focus:outline-none transition-all text-xs font-light"
                          />
                        </div>

                        <div className="flex flex-col space-y-2">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Idade / Detalhes</label>
                          <input
                            type="text"
                            required
                            value={aboutForm.ceoAge}
                            onChange={(e) => setAboutForm(prev => ({ ...prev, ceoAge: e.target.value }))}
                            className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white focus:border-neon-purple focus:outline-none transition-all text-xs font-light"
                          />
                        </div>

                        <div className="flex flex-col space-y-2">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Localização</label>
                          <input
                            type="text"
                            required
                            value={aboutForm.ceoLoc}
                            onChange={(e) => setAboutForm(prev => ({ ...prev, ceoLoc: e.target.value }))}
                            className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white focus:border-neon-purple focus:outline-none transition-all text-xs font-light"
                          />
                        </div>

                        <div className="flex flex-col space-y-2">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Tag Religiosa / Descrição</label>
                          <input
                            type="text"
                            required
                            value={aboutForm.ceoTag}
                            onChange={(e) => setAboutForm(prev => ({ ...prev, ceoTag: e.target.value }))}
                            className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white focus:border-neon-purple focus:outline-none transition-all text-xs font-light"
                          />
                        </div>

                        <div className="flex flex-col space-y-2 sm:col-span-2">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Foto da CEO</label>
                          <div className="flex items-center space-x-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, 'ceoImage')}
                              className="hidden"
                              id="upload-ceo"
                            />
                            <label
                              htmlFor="upload-ceo"
                              className="flex items-center space-x-2 px-4 py-3 bg-zinc-950 border border-zinc-900 hover:border-neon-purple rounded-xl text-xs font-semibold text-zinc-400 hover:text-white transition-all cursor-pointer"
                            >
                              <Upload size={14} />
                              <span>Upload Imagem</span>
                            </label>
                            {aboutForm.ceoImage && (
                              <span className="text-[10px] text-neon-purple font-mono">Pronta</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats metrics */}
                    <div className="border-t border-zinc-800 pt-6 space-y-6">
                      <h3 className="text-xs uppercase font-mono tracking-widest text-zinc-400">Estatísticas do Site</h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex flex-col space-y-2">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Métrica 1 (Valor & Legenda)</label>
                          <div className="flex space-x-2">
                            <input type="text" value={aboutForm.stat1_val} onChange={(e) => setAboutForm(p => ({ ...p, stat1_val: e.target.value }))} className="w-1/3 px-3 py-2 bg-zinc-950 border border-zinc-900 rounded-lg text-xs" />
                            <input type="text" value={aboutForm.stat1_lbl} onChange={(e) => setAboutForm(p => ({ ...p, stat1_lbl: e.target.value }))} className="w-2/3 px-3 py-2 bg-zinc-950 border border-zinc-900 rounded-lg text-xs" />
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Métrica 2 (Valor & Legenda)</label>
                          <div className="flex space-x-2">
                            <input type="text" value={aboutForm.stat2_val} onChange={(e) => setAboutForm(p => ({ ...p, stat2_val: e.target.value }))} className="w-1/3 px-3 py-2 bg-zinc-950 border border-zinc-900 rounded-lg text-xs" />
                            <input type="text" value={aboutForm.stat2_lbl} onChange={(e) => setAboutForm(p => ({ ...p, stat2_lbl: e.target.value }))} className="w-2/3 px-3 py-2 bg-zinc-950 border border-zinc-900 rounded-lg text-xs" />
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Métrica 3 (Valor & Legenda - Com Ícone Estrela)</label>
                          <div className="flex space-x-2">
                            <input type="text" value={aboutForm.stat3_val} onChange={(e) => setAboutForm(p => ({ ...p, stat3_val: e.target.value }))} className="w-1/3 px-3 py-2 bg-zinc-950 border border-zinc-900 rounded-lg text-xs" />
                            <input type="text" value={aboutForm.stat3_lbl} onChange={(e) => setAboutForm(p => ({ ...p, stat3_lbl: e.target.value }))} className="w-2/3 px-3 py-2 bg-zinc-950 border border-zinc-900 rounded-lg text-xs" />
                          </div>
                        </div>

                        <div className="flex flex-col space-y-2">
                          <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Métrica 4 (Valor & Legenda)</label>
                          <div className="flex space-x-2">
                            <input type="text" value={aboutForm.stat4_val} onChange={(e) => setAboutForm(p => ({ ...p, stat4_val: e.target.value }))} className="w-1/3 px-3 py-2 bg-zinc-950 border border-zinc-900 rounded-lg text-xs" />
                            <input type="text" value={aboutForm.stat4_lbl} onChange={(e) => setAboutForm(p => ({ ...p, stat4_lbl: e.target.value }))} className="w-2/3 px-3 py-2 bg-zinc-950 border border-zinc-900 rounded-lg text-xs" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-xl hover:bg-neon-purple hover:text-white transition-all cursor-pointer"
                      >
                        Salvar Informações
                      </button>
                    </div>

                  </form>
                </div>
              )}

              {/* TAB 5: SERVICES MANAGER */}
              {activeTab === 'services' && (
                <div className="space-y-8">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-white uppercase font-space tracking-tight">Serviços Prestados</h2>
                    <p className="text-zinc-500 text-xs font-light">Selecione uma categoria de serviços para editar a lista de itens ofertados.</p>
                  </div>

                  {editingServiceId ? (
                    <form onSubmit={handleServiceSubmit} className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl space-y-4">
                      <h3 className="text-sm font-semibold text-white uppercase font-space">
                        Editar Itens: {servicesList.find(s => s.id === editingServiceId)?.title}
                      </h3>
                      
                      <div className="flex flex-col space-y-2">
                        <label className="text-[9px] font-mono uppercase tracking-widest text-zinc-500">Itens (um por linha)</label>
                        <textarea
                          required
                          rows={10}
                          value={serviceFormItems}
                          onChange={(e) => setServiceFormItems(e.target.value)}
                          placeholder="Digite um serviço por linha..."
                          className="px-4 py-3 bg-zinc-950 border border-zinc-900 rounded-xl text-white focus:border-neon-purple focus:outline-none transition-all text-xs font-mono font-light resize-y"
                        />
                      </div>

                      <div className="flex space-x-3 pt-2">
                        <button
                          type="submit"
                          className="px-6 py-3 bg-white text-black font-semibold text-xs tracking-widest uppercase rounded-xl hover:bg-neon-purple hover:text-white transition-all cursor-pointer"
                        >
                          Salvar Alterações
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingServiceId(null);
                            setServiceFormItems('');
                          }}
                          className="px-6 py-3 bg-zinc-950 border border-zinc-900 text-zinc-400 hover:text-white hover:border-zinc-700 rounded-xl text-xs font-semibold tracking-widest uppercase cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {servicesList.map((cat) => (
                        <div key={cat.id} className="p-6 bg-zinc-900 border border-zinc-850 rounded-2xl flex flex-col justify-between space-y-4">
                          <div>
                            <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-500">{cat.id}</span>
                            <h3 className="text-base font-bold text-white mt-1">{cat.title}</h3>
                            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">{cat.subtitle}</p>
                            
                            <ul className="mt-4 space-y-1.5">
                              {cat.items.map((item, idx) => (
                                <li key={idx} className="text-xs text-zinc-400 font-light truncate flex items-center">
                                  <span className="w-1 h-1 rounded-full bg-zinc-750 mr-2 shrink-0" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <button
                            onClick={() => handleEditServiceClick(cat)}
                            className="w-full flex items-center justify-center space-x-2 py-2 border border-zinc-800 hover:border-neon-purple text-zinc-400 hover:text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                          >
                            <Edit2 size={12} />
                            <span>Editar Lista</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </main>

          </div>
        </div>
      )}

    </div>
  );
}
