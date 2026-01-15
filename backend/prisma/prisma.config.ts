import type { Config } from '@prisma/internals';

const config: Config = {
  datasources: {
    db: {
      url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/fullstackapi',
    },
  },
};

export default config;
