import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env' });

export default defineConfig({
  schema: "./config/schema.tsx",
//   out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_F9qbmLtCWOa7@ep-holy-bird-a4e6hu1x-pooler.us-east-1.aws.neon.tech/ai-kids-story-generator?sslmode=require',
  },
});
