import { z } from "zod/v4"
import "dotenv/config"

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default("localhost"),
  URL: z.url().default("http://localhost:3000"),
  DATABASE_URL: z.string().default("postgres://postgres:postgres@postgres:5432/postgres")
})

export const env = envSchema.parse(process.env)