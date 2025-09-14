import { defineConfig } from "drizzle-kit";
import { env } from "./src/utils/env"

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/lib/db/schemas',
  out: './src/lib/db/migrations',
  dbCredentials: {
    url: env.DATABASE_URL
  }
})