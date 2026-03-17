import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',  // yeh sahi path hai tere project mein
  datasource: {
    url: env('DATABASE_URL'),
  },
});