import { Pool } from 'pg';

let pool: Pool;

if (process.env.POSTGRES_URL) {
  pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
} else {
  // Fallback for build or local dev
  pool = new Pool();
}

export default pool;
