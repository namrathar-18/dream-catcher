import pg from 'pg';

const { Pool } = pg;

const missingDatabaseMessage = 'DATABASE_URL is missing. Check your .env file.';

function createDatabaseStub() {
  const error = new Error(missingDatabaseMessage);

  return {
    async query() {
      throw error;
    },
    async connect() {
      throw error;
    },
    async end() {
      return undefined;
    },
    on() {
      return this;
    }
  };
}

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false'
      }
    })
  : createDatabaseStub();

if (process.env.DATABASE_URL) {
  pool.on('error', (error) => {
    console.error('Unexpected PostgreSQL pool error:', error);
  });
} else {
  console.warn('DATABASE_URL is missing. Database features remain unavailable until .env is configured.');
}

export default pool;