export const dynamic = 'force-dynamic';

import pool from '@/lib/db';
import { NextResponse } from 'next/server';

// Fallback Mock Data for Local Development (when POSTGRES_URL is missing)
const MOCK_PRODUCTS = [
  {
    id: 'oversized-premium',
    name: 'Camiseta Oversized Rise Premium',
    price: 'R$ 149,90',
    category: 'Oversized',
    frontImage: '/oversized_front.jpg',
    backImage: '/oversized_back.jpg',
    description: 'Camiseta oversized premium confeccionada em algodão de alta gramatura (heavyweight). Modelagem streetwear exclusiva com caimento perfeito, ombros caídos e estampa em silk de alta definição com detalhes em roxo neon na parte traseira.',
    colors: ['Preto'],
    sizes: ['P', 'M', 'G', 'GG'],
    stock: 10
  }
];

const MOCK_SERVICES = [
  {
    id: 'design',
    title: 'DESIGN',
    subtitle: 'IDENTIDADE VISUAL & BRANDING',
    glow: 'neon-purple',
    items: ['Desenvolvimento de Logos Premium', 'Manuais de Identidade Visual', 'Papelaria Corporativa & Flyers', 'Mockups Realistas 3D', 'Apresentações Comerciais', 'Design Editorial & Catálogos']
  },
  {
    id: 'branding',
    title: 'STREETWEAR',
    subtitle: 'CONFECCÇÃO DE ROUPAS & DROPS',
    glow: 'electric-blue',
    items: ['Criação de Estampas Exclusivas', 'Modelagens Oversized Streetwear', 'Fichas Técnicas de Costura', 'Direção Criativa de Coleções', 'Acompanhamento de Produção', 'Tags, Etiquetas & Embalagens']
  },
  {
    id: 'motion',
    title: 'MOTION',
    subtitle: 'MOTION GRAPHICS & FLYERS ANIMADOS',
    glow: 'neon-pink',
    items: ['Flyers Animados para Eventos', 'Apresentação de Logos em Motion', 'Vídeos Promocionais Curtos', 'Animações para Redes Sociais', 'Stories Dinâmicos e Reels', 'Intros e Vinhetas para Vídeos']
  }
];

const MOCK_ABOUT = {
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

const MOCK_HERO = {
  tagline: 'Creative House',
  tags: ['Design', 'Branding', 'Streetwear', 'Motion'],
  slogan: '"Create Beyond Limits"',
  subSlogan: 'Criamos além dos limites.',
  bgImage: '/hero_bg_streetwear.jpg'
};

// GET method: Retrieve all data
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (!process.env.POSTGRES_URL) {
    console.warn('POSTGRES_URL is missing. Returning local fallback mock data.');
    return NextResponse.json({
      products: MOCK_PRODUCTS,
      portfolio: [],
      producedItems: [],
      services: MOCK_SERVICES,
      about: MOCK_ABOUT,
      hero: MOCK_HERO
    });
  }

  try {
    if (type === 'all' || !type) {
      const productsData = await pool.query('SELECT * FROM products;');
      const portfolioData = await pool.query('SELECT * FROM portfolio ORDER BY id DESC;');
      const producedData = await pool.query('SELECT * FROM produced_items ORDER BY id DESC;');
      const servicesData = await pool.query('SELECT * FROM services;');
      const aboutData = await pool.query('SELECT * FROM about WHERE id = 1;');
      const heroData = await pool.query('SELECT * FROM hero WHERE id = 1;');

      // Helper to parse arrays from JSON/Text database format
      const parseJson = (val: any) => {
        if (!val) return [];
        return typeof val === 'string' ? JSON.parse(val) : val;
      };

      // Formatar resultados
      const products = productsData.rows.map(row => ({
        id: row.id,
        name: row.name,
        price: row.price,
        category: row.category,
        frontImage: row.front_image,
        backImage: row.back_image,
        description: row.description,
        colors: parseJson(row.colors),
        sizes: parseJson(row.sizes),
        stock: row.stock
      }));

      const portfolio = portfolioData.rows.map(row => ({
        id: row.id,
        title: row.title,
        category: row.category,
        image: row.image,
        description: row.description,
        year: row.year
      }));

      const producedItems = producedData.rows.map(row => ({
        id: Number(row.id),
        name: row.name,
        client: row.client,
        category: row.category,
        frontImage: row.front_image,
        backImage: row.back_image,
        description: row.description
      }));

      const services = servicesData.rows.map(row => ({
        id: row.id,
        title: row.title,
        subtitle: row.subtitle,
        glow: row.glow,
        items: parseJson(row.items)
      }));

      const aboutRow = aboutData.rows[0];
      const about = aboutRow ? {
        story: aboutRow.story,
        mission: aboutRow.mission,
        ceoName: aboutRow.ceo_name,
        ceoAge: aboutRow.ceo_age,
        ceoLoc: aboutRow.ceo_loc,
        ceoTag: aboutRow.ceo_tag,
        ceoImage: aboutRow.ceo_image,
        stats: parseJson(aboutRow.stats)
      } : MOCK_ABOUT;

      const heroRow = heroData.rows[0];
      const hero = heroRow ? {
        tagline: heroRow.tagline,
        tags: parseJson(heroRow.tags),
        slogan: heroRow.slogan,
        subSlogan: heroRow.sub_slogan,
        bgImage: heroRow.bg_image
      } : MOCK_HERO;

      return NextResponse.json({
        products,
        portfolio,
        producedItems,
        services,
        about,
        hero
      });
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  } catch (error: any) {
    console.error('Database query failed, returning fallbacks', error);
    return NextResponse.json({
      products: MOCK_PRODUCTS,
      portfolio: [],
      producedItems: [],
      services: MOCK_SERVICES,
      about: MOCK_ABOUT,
      hero: MOCK_HERO,
      warning: 'Database query failed. Using mock data.',
      error: error.message
    });
  }
}

// POST/PUT/DELETE method: Manage writes
export async function POST(request: Request) {
  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ error: 'POSTGRES_URL missing' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const body = await request.json();

    if (type === 'product') {
      const { id, name, price, category, frontImage, backImage, description, colors, sizes, stock } = body;
      await pool.query(`
        INSERT INTO products (id, name, price, category, front_image, back_image, description, colors, sizes, stock)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          price = EXCLUDED.price,
          category = EXCLUDED.category,
          front_image = EXCLUDED.front_image,
          back_image = EXCLUDED.back_image,
          description = EXCLUDED.description,
          colors = EXCLUDED.colors,
          sizes = EXCLUDED.sizes,
          stock = EXCLUDED.stock;
      `, [id, name, price, category, frontImage, backImage, description, JSON.stringify(colors), JSON.stringify(sizes), stock]);
      return NextResponse.json({ success: true });
    }

    if (type === 'portfolio') {
      const { id, title, category, image, description, year } = body;
      if (id) {
        // Update
        await pool.query(`
          UPDATE portfolio SET
            title = $1,
            category = $2,
            image = $3,
            description = $4,
            year = $5
          WHERE id = $6;
        `, [title, category, image, description, year, id]);
      } else {
        // Insert
        await pool.query(`
          INSERT INTO portfolio (title, category, image, description, year)
          VALUES ($1, $2, $3, $4, $5);
        `, [title, category, image, description, year]);
      }
      return NextResponse.json({ success: true });
    }

    if (type === 'produced') {
      const { id, name, client, category, frontImage, backImage, description } = body;
      await pool.query(`
        INSERT INTO produced_items (id, name, client, category, front_image, back_image, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          client = EXCLUDED.client,
          category = EXCLUDED.category,
          front_image = EXCLUDED.front_image,
          back_image = EXCLUDED.back_image,
          description = EXCLUDED.description;
      `, [id, name, client, category, frontImage, backImage, description]);
      return NextResponse.json({ success: true });
    }

    if (type === 'services') {
      const servicesList = body; // Array of ServiceCategory
      // Clean and batch upsert
      await pool.query('DELETE FROM services;');
      for (const s of servicesList) {
        await pool.query(`
          INSERT INTO services (id, title, subtitle, glow, items)
          VALUES ($1, $2, $3, $4, $5);
        `, [s.id, s.title, s.subtitle, s.glow, JSON.stringify(s.items)]);
      }
      return NextResponse.json({ success: true });
    }

    if (type === 'about') {
      const { story, mission, ceoName, ceoAge, ceoLoc, ceoTag, ceoImage, stats } = body;
      await pool.query(`
        INSERT INTO about (id, story, mission, ceo_name, ceo_age, ceo_loc, ceo_tag, ceo_image, stats)
        VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO UPDATE SET
          story = EXCLUDED.story,
          mission = EXCLUDED.mission,
          ceo_name = EXCLUDED.ceo_name,
          ceo_age = EXCLUDED.ceo_age,
          ceo_loc = EXCLUDED.ceo_loc,
          ceo_tag = EXCLUDED.ceo_tag,
          ceo_image = EXCLUDED.ceo_image,
          stats = EXCLUDED.stats;
      `, [story, mission, ceoName, ceoAge, ceoLoc, ceoTag, ceoImage, JSON.stringify(stats)]);
      return NextResponse.json({ success: true });
    }

    if (type === 'hero') {
      const { tagline, tags, slogan, subSlogan, bgImage } = body;
      await pool.query(`
        INSERT INTO hero (id, tagline, tags, slogan, sub_slogan, bg_image)
        VALUES (1, $1, $2, $3, $4, $5)
        ON CONFLICT (id) DO UPDATE SET
          tagline = EXCLUDED.tagline,
          tags = EXCLUDED.tags,
          slogan = EXCLUDED.slogan,
          sub_slogan = EXCLUDED.sub_slogan,
          bg_image = EXCLUDED.bg_image;
      `, [tagline, JSON.stringify(tags), slogan, subSlogan, bgImage]);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  } catch (error: any) {
    console.error('Database write failed', error);
    return NextResponse.json({ error: error.message || 'Write operation failed' }, { status: 500 });
  }
}

// DELETE Handler for removals
export async function DELETE(request: Request) {
  if (!process.env.POSTGRES_URL) {
    return NextResponse.json({ error: 'POSTGRES_URL missing' }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json({ error: 'Missing type or id' }, { status: 400 });
    }

    if (type === 'product') {
      await pool.query('DELETE FROM products WHERE id = $1;', [id]);
      return NextResponse.json({ success: true });
    }

    if (type === 'portfolio') {
      await pool.query('DELETE FROM portfolio WHERE id = $1;', [parseInt(id)]);
      return NextResponse.json({ success: true });
    }

    if (type === 'produced') {
      await pool.query('DELETE FROM produced_items WHERE id = $1;', [id]);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
  } catch (error: any) {
    console.error('Database delete failed', error);
    return NextResponse.json({ error: error.message || 'Delete operation failed' }, { status: 500 });
  }
}
