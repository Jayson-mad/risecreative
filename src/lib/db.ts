import { Pool } from 'pg';

let pool: Pool;

if (process.env.POSTGRES_URL) {
  const cleanConnectionString = process.env.POSTGRES_URL.split('?')[0];
  pool = new Pool({
    connectionString: cleanConnectionString,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  // Fallback for build or local dev
  pool = new Pool();
}

export default pool;
