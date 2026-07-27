'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  frontImage: string;
  backImage: string;
  description: string;
  colors: string[];
  sizes: string[];
  stock: number; // Added stock tracking
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  year: string;
}

export interface ProducedItem {
  id: number;
  name: string;
  client: string;
  category: string;
  frontImage: string;
  backImage: string;
  description: string;
}

export interface ServiceCategory {
  id: string;
  title: string;
  subtitle: string;
  glow: string;
  items: string[];
}

export interface AboutData {
  story: string;
  mission: string;
  ceoName: string;
  ceoAge: string;
  ceoLoc: string;
  ceoTag: string;
  ceoImage: string;
  stats: { value: string; label: string; icon?: string }[];
}

export interface HeroData {
  tagline: string;
  tags: string[];
  slogan: string;
  subSlogan: string;
  bgImage: string;
}

interface AppContextType {
  products: Product[];
  portfolio: PortfolioItem[];
  producedItems: ProducedItem[]; // Added producedItems state
  services: ServiceCategory[];
  about: AboutData;
  hero: HeroData; // Added hero state
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addPortfolio: (item: Omit<PortfolioItem, 'id'>) => void;
  updatePortfolio: (id: number, item: Partial<PortfolioItem>) => void;
  deletePortfolio: (id: number) => void;
  addProducedItem: (item: Omit<ProducedItem, 'id'>) => void; // Added produced action
  updateProducedItem: (id: number, item: Partial<ProducedItem>) => void; // Added produced action
  deleteProducedItem: (id: number) => void; // Added produced action
  updateAbout: (data: Partial<AboutData>) => void;
  updateServices: (services: ServiceCategory[]) => void;
  updateHero: (data: Partial<HeroData>) => void; // Added updateHero action
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const INITIAL_PRODUCTS: Product[] = [
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
    stock: 50
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
    stock: 25
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
    stock: 15
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
    stock: 40
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
    stock: 0 // Out of stock by default to demonstrate
  }
];

const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: 1,
    title: 'Rise Streetwear Fall/Winter',
    category: 'Streetwear',
    image: '/hero_bg_streetwear.jpg',
    description: 'Campanha de lançamento da primeira coleção oficial da Rise Store. Fotografia conceitual em estúdio com iluminação neon dramática e estética industrial.',
    year: '2026'
  },
  {
    id: 2,
    title: 'Identidade Visual - Kingdom Fest',
    category: 'Identidade Visual',
    image: '/hero_bg_streetwear.jpg',
    description: 'Desenvolvimento de logo, guia de cores, tipografia e enxoval digital para um dos maiores festivais de música cristã da região.',
    year: '2025'
  },
  {
    id: 3,
    title: 'Motion Flyer - Conferência de Jovens',
    category: 'Motion',
    image: '/hero_bg_streetwear.jpg',
    description: 'Flyer digital animado com motion graphics sincronizados à trilha sonora. Utilizado nas redes sociais para divulgação orgânica e tráfego pago.',
    year: '2026'
  },
  {
    id: 4,
    title: 'Aftermovie Oficial - Arena Church',
    category: 'Eventos',
    image: '/hero_bg_streetwear.jpg',
    description: 'Captação e edição profissional de vídeo de cobertura para evento de 3 dias com foco em dinamismo, luz natural e transições rápidas.',
    year: '2025'
  }
];

const INITIAL_PRODUCED: ProducedItem[] = [
  {
    id: 1,
    name: 'Oversized Kingdom 2026',
    client: 'Jovens Kingdom Church',
    category: 'Oversized',
    frontImage: '/oversized_front.jpg',
    backImage: '/oversized_back.jpg',
    description: 'Camiseta oversized preta personalizada com estampa traseira em roxo neon para equipe de staff e liderança.'
  },
  {
    id: 2,
    name: 'Moletom Box Logo Rise',
    client: 'Coleção Rise Classic',
    category: 'Moletons',
    frontImage: '/oversized_front.jpg',
    backImage: '/oversized_back.jpg',
    description: 'Moletom premium flanelado com bordado no peito.'
  },
  {
    id: 3,
    name: 'Boné Strapback Arena',
    client: 'Arena Church Eventos',
    category: 'Bonés',
    frontImage: '/oversized_front.jpg',
    backImage: '/oversized_back.jpg',
    description: 'Boné de algodão estruturado com bordado lateral minimalista.'
  }
];

const INITIAL_SERVICES: ServiceCategory[] = [
  {
    id: 'studio',
    title: 'Creative Studio',
    subtitle: 'Branding & Motion Design',
    glow: 'rgba(139, 92, 246, 0.4)',
    items: [
      'Logos Premium',
      'Identidade Visual Completa',
      'Branding Corporativo',
      'Flyers Modernos',
      'Motion Flyers Animados',
      'Lyric Videos',
      'Projeções Panorâmicas',
    ]
  },
  {
    id: 'streetwear',
    title: 'Streetwear Lab',
    subtitle: 'Confecção & Estamparia Premium',
    glow: 'rgba(236, 72, 153, 0.4)',
    items: [
      'Camisetas Oversized Personalizadas',
      'Sublimação Total Digital',
      'Tecidos Técnicos Dryfit',
      'Camisas Estilizadas para Eventos',
      'Moletons de Alta Gramatura',
      'Ecobags com Estampas Streetwear',
    ]
  },
  {
    id: 'merch',
    title: 'Brand Experience',
    subtitle: 'Acessórios & Visual Identity',
    glow: 'rgba(59, 130, 246, 0.4)',
    items: [
      'Bonés Premium / Bordados',
      'Canecas de Cerâmica Customizadas',
      'Garrafas Térmicas de Inox',
      'Cordões e Crachás Premium',
      'Backdrops e Fundos Fotográficos',
      'Fachadas e Placas Luminosas',
      'Banners e Lonas de Alto Impacto',
      'Cartões de Visita e Papelaria Fina',
    ]
  },
  {
    id: 'production',
    title: 'Visual Production',
    subtitle: 'Audiovisual & Fine Art Print',
    glow: 'rgba(255, 255, 255, 0.3)',
    items: [
      'FilmMaker Mobile (Captação e Edição)',
      'Cobertura Audiovisual de Eventos',
      'Direção Criativa e Reels',
      'Impressão Digital Fina (A4, A3, F4)',
    ]
  }
];

const INITIAL_ABOUT: AboutData = {
  story: 'A Rise Creative nasceu com o propósito de transformar ideias em experiências visuais de alto impacto. Mais do que uma agência, somos uma Creative House especializada em Branding, Design, Moda Streetwear e Produção Visual.',
  mission: 'Acreditamos que excelência glorifica a Deus, por isso buscamos entregar criatividade, qualidade e propósito em cada projeto, atendendo tanto eventos cristãos quanto empresas e clientes do mercado em geral. Nossa missão é elevar marcas através do design, inovação e atenção aos detalhes, construindo identidades que inspiram pessoas e geram resultados.',
  ceoName: 'Rayssa Castro',
  ceoAge: '20 anos',
  ceoLoc: 'Manaus • Amazonas',
  ceoTag: 'Cristã',
  ceoImage: '/ceo_rayssa.jpg',
  stats: [
    { value: '+500', label: 'Projetos Entregues' },
    { value: '+100', label: 'Clientes Satisfeitos' },
    { value: '5/5', label: 'Avaliação Média', icon: 'Star' },
    { value: 'Nacional', label: 'Atendimento Brasil' }
  ]
};

const INITIAL_HERO: HeroData = {
  tagline: 'Creative House',
  tags: ['Design', 'Branding', 'Streetwear', 'Motion'],
  slogan: '"Create Beyond Limits"',
  subSlogan: 'Criamos além dos limites.',
  bgImage: '/hero_bg_streetwear.jpg'
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);
  const [producedItems, setProducedItems] = useState<ProducedItem[]>(INITIAL_PRODUCED);
  const [services, setServices] = useState<ServiceCategory[]>(INITIAL_SERVICES);
  const [about, setAbout] = useState<AboutData>(INITIAL_ABOUT);
  const [hero, setHero] = useState<HeroData>(INITIAL_HERO);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from database on mount (falls back to local initialization if missing)
  useEffect(() => {
    const initAndLoad = async () => {
      try {
        // Trigger DB init if needed (failsafe setup)
        await fetch('/api/db/init');
        
        // Fetch all states from cloud database
        const res = await fetch('/api/db');
        const data = await res.json();
        
        if (data.products) setProducts(data.products);
        if (data.portfolio) setPortfolio(data.portfolio);
        if (data.producedItems) setProducedItems(data.producedItems);
        if (data.services) setServices(data.services);
        if (data.about) setAbout(data.about);
        if (data.hero) setHero(data.hero);
      } catch (e) {
        console.error('Failed to load state from cloud database, falling back to local initial mock data.', e);
      } finally {
        setIsLoaded(true);
      }
    };
    initAndLoad();
  }, []);

  // Product Operations
  const addProduct = async (p: Omit<Product, 'id'>) => {
    const id = p.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const newProduct = { ...p, id };
    setProducts((prev) => [...prev, newProduct]);
    try {
      await fetch('/api/db?type=product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
    } catch (e) {
      console.error('Failed to add product to database', e);
    }
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updatedFields };
          fetch('/api/db?type=product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
          }).catch((e) => console.error('Failed to update product in database', e));
          return updated;
        }
        return item;
      })
    );
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try {
      await fetch(`/api/db?type=product&id=${id}`, {
        method: 'DELETE'
      });
    } catch (e) {
      console.error('Failed to delete product from database', e);
    }
  };

  // Portfolio Operations
  const addPortfolio = async (item: Omit<PortfolioItem, 'id'>) => {
    try {
      await fetch('/api/db?type=portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      // Fetch latest portfolio items to get correct serial IDs
      const res = await fetch('/api/db');
      const data = await res.json();
      if (data.portfolio) setPortfolio(data.portfolio);
    } catch (e) {
      console.error('Failed to add portfolio to database', e);
    }
  };

  const updatePortfolio = async (id: number, updatedFields: Partial<PortfolioItem>) => {
    setPortfolio((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updatedFields };
          fetch('/api/db?type=portfolio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
          }).catch((e) => console.error('Failed to update portfolio in database', e));
          return updated;
        }
        return item;
      })
    );
  };

  const deletePortfolio = async (id: number) => {
    setPortfolio((prev) => prev.filter((item) => item.id !== id));
    try {
      await fetch(`/api/db?type=portfolio&id=${id}`, {
        method: 'DELETE'
      });
    } catch (e) {
      console.error('Failed to delete portfolio from database', e);
    }
  };

  // Produced Items Operations
  const addProducedItem = async (item: Omit<ProducedItem, 'id'>) => {
    const id = Date.now();
    const newItem = { ...item, id };
    setProducedItems((prev) => [...prev, newItem]);
    try {
      await fetch('/api/db?type=produced', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
      });
    } catch (e) {
      console.error('Failed to add produced item to database', e);
    }
  };

  const updateProducedItem = async (id: number, updatedFields: Partial<ProducedItem>) => {
    setProducedItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updatedFields };
          fetch('/api/db?type=produced', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated)
          }).catch((e) => console.error('Failed to update produced item in database', e));
          return updated;
        }
        return item;
      })
    );
  };

  const deleteProducedItem = async (id: number) => {
    setProducedItems((prev) => prev.filter((item) => item.id !== id));
    try {
      await fetch(`/api/db?type=produced&id=${id}`, {
        method: 'DELETE'
      });
    } catch (e) {
      console.error('Failed to delete produced item from database', e);
    }
  };

  // About/Stats Operations
  const updateAbout = async (data: Partial<AboutData>) => {
    setAbout((prev) => {
      const updated = { ...prev, ...data };
      fetch('/api/db?type=about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      }).catch((e) => console.error('Failed to update about data in database', e));
      return updated;
    });
  };

  // Services Operations
  const updateServices = async (newServices: ServiceCategory[]) => {
    setServices(newServices);
    try {
      await fetch('/api/db?type=services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newServices)
      });
    } catch (e) {
      console.error('Failed to update services in database', e);
    }
  };

  // Hero Operations
  const updateHero = async (data: Partial<HeroData>) => {
    setHero((prev) => {
      const updated = { ...prev, ...data };
      fetch('/api/db?type=hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      }).catch((e) => console.error('Failed to update hero data in database', e));
      return updated;
    });
  };

  return (
    <AppContext.Provider
      value={{
        products,
        portfolio,
        producedItems,
        services,
        about,
        hero,
        addProduct,
        updateProduct,
        deleteProduct,
        addPortfolio,
        updatePortfolio,
        deletePortfolio,
        addProducedItem,
        updateProducedItem,
        deleteProducedItem,
        updateAbout,
        updateServices,
        updateHero,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
