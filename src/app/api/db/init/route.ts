import pool from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  if (!process.env.POSTGRES_URL) {
    return NextResponse.json(
      { error: 'POSTGRES_URL environment variable is missing. Connect your database in Vercel first.' },
      { status: 500 }
    );
  }

  try {
    // 1. Products Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS products (
        id VARCHAR(255) PRIMARY KEY,
        name TEXT NOT NULL,
        price TEXT NOT NULL,
        category TEXT NOT NULL,
        front_image TEXT,
        back_image TEXT,
        description TEXT,
        colors JSONB NOT NULL,
        sizes JSONB NOT NULL,
        stock INTEGER NOT NULL DEFAULT 0
      );
    `);

    // 2. Portfolio Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        image TEXT,
        description TEXT,
        year TEXT
      );
    `);

    // 3. Produced Items Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS produced_items (
        id BIGINT PRIMARY KEY,
        name TEXT NOT NULL,
        client TEXT NOT NULL,
        category TEXT NOT NULL,
        front_image TEXT,
        back_image TEXT,
        description TEXT
      );
    `);

    // 4. Services Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS services (
        id VARCHAR(255) PRIMARY KEY,
        title TEXT NOT NULL,
        subtitle TEXT NOT NULL,
        glow TEXT NOT NULL,
        items JSONB NOT NULL
      );
    `);

    // 5. About Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS about (
        id INTEGER PRIMARY KEY DEFAULT 1,
        story TEXT NOT NULL,
        mission TEXT NOT NULL,
        ceo_name TEXT NOT NULL,
        ceo_age TEXT NOT NULL,
        ceo_loc TEXT NOT NULL,
        ceo_tag TEXT NOT NULL,
        ceo_image TEXT,
        stats JSONB NOT NULL,
        CONSTRAINT one_row_about CHECK (id = 1)
      );
    `);

    // 6. Hero Table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS hero (
        id INTEGER PRIMARY KEY DEFAULT 1,
        tagline TEXT NOT NULL,
        tags JSONB NOT NULL,
        slogan TEXT NOT NULL,
        sub_slogan TEXT NOT NULL,
        bg_image TEXT,
        CONSTRAINT one_row_hero CHECK (id = 1)
      );
    `);

    // Seeding Initial Data if empty
    // Check Products
    const prodCheck = await pool.query('SELECT COUNT(*) FROM products;');
    if (parseInt(prodCheck.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO products (id, name, price, category, front_image, back_image, description, colors, sizes, stock)
        VALUES (
          'oversized-premium', 
          'Camiseta Oversized Rise Premium', 
          'R$ 149,90', 
          'Oversized', 
          '/oversized_front.jpg', 
          '/oversized_back.jpg', 
          'Camiseta oversized premium confeccionada em algodão de alta gramatura (heavyweight). Modelagem streetwear exclusiva com caimento perfeito, ombros caídos e estampa em silk de alta definição com detalhes em roxo neon na parte traseira.',
          '["Preto"]',
          '["P", "M", "G", "GG"]',
          10
        );
      `);
    }

    // Check Services
    const servCheck = await pool.query('SELECT COUNT(*) FROM services;');
    if (parseInt(servCheck.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO services (id, title, subtitle, glow, items)
        VALUES 
        ('design', 'DESIGN', 'IDENTIDADE VISUAL & BRANDING', 'neon-purple', '["Desenvolvimento de Logos Premium", "Manuais de Identidade Visual", "Papelaria Corporativa & Flyers", "Mockups Realistas 3D", "Apresentações Comerciais", "Design Editorial & Catálogos"]'),
        ('branding', 'STREETWEAR', 'CONFECCÇÃO DE ROUPAS & DROPS', 'electric-blue', '["Criação de Estampas Exclusivas", "Modelagens Oversized Streetwear", "Fichas Técnicas de Costura", "Direção Criativa de Coleções", "Acompanhamento de Produção", "Tags, Etiquetas & Embalagens"]'),
        ('motion', 'MOTION', 'MOTION GRAPHICS & FLYERS ANIMADOS', 'neon-pink', '["Flyers Animados para Eventos", "Apresentação de Logos em Motion", "Vídeos Promocionais Curtos", "Animações para Redes Sociais", "Stories Dinâmicos e Reels", "Intros e Vinhetas para Vídeos"]');
      `);
    }

    // Check About
    const aboutCheck = await pool.query('SELECT COUNT(*) FROM about;');
    if (parseInt(aboutCheck.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO about (id, story, mission, ceo_name, ceo_age, ceo_loc, ceo_tag, ceo_image, stats)
        VALUES (
          1,
          'A Rise Creative nasceu com o propósito de transformar ideias em experiências visuais de alto impacto. Mais do que uma agência, somos uma Creative House especializada em Branding, Design, Moda Streetwear e Produção Visual.',
          'Acreditamos que excelência glorifica a Deus, por isso buscamos entregar criatividade, qualidade e propósito em cada projeto, atendendo tanto eventos cristãos quanto empresas e clientes do mercado em geral. Nossa missão é elevar marcas através do design, inovação e atenção aos detalhes, construindo identidades que inspiram pessoas e geram resultados.',
          'Rayssa Castro',
          '20 anos',
          'Manaus • Amazonas',
          'Cristã',
          '/ceo_rayssa.jpg',
          '[
            {"value": "+500", "label": "Projetos Entregues"},
            {"value": "+100", "label": "Clientes Satisfeitos"},
            {"value": "5/5", "label": "Avaliação Média", "icon": "Star"},
            {"value": "Nacional", "label": "Atendimento Brasil"}
          ]'
        );
      `);
    }

    // Check Hero
    const heroCheck = await pool.query('SELECT COUNT(*) FROM hero;');
    if (parseInt(heroCheck.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO hero (id, tagline, tags, slogan, sub_slogan, bg_image)
        VALUES (
          1,
          'Creative House',
          '["Design", "Branding", "Streetwear", "Motion"]',
          '"Create Beyond Limits"',
          'Criamos além dos limites.',
          '/hero_bg_streetwear.jpg'
        );
      `);
    }

    return NextResponse.json({ success: true, message: 'Database initialized successfully' });
  } catch (error: any) {
    console.error('Failed to initialize database', error);
    return NextResponse.json({ error: error.message || 'Database initialization failed' }, { status: 500 });
  }
}
