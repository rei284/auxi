import { createAuthClient } from "better-auth/client";
import { env } from "../utils/env.js"

export const authClient = createAuthClient({
  baseURL: env.URL
})