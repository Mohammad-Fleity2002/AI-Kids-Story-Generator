import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./config/schema.tsx",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_Y28aZydetjsF@ep-odd-shape-a8awd6eb-pooler.eastus2.azure.neon.tech/ai_kids_story_builder?sslmode=require',
  },
  strict: true,
  verbose: true,
})
