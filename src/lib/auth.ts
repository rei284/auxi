import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { username } from "better-auth/plugins";

import { db } from "./db/index.js";
import * as schema from "./db/schemas/auth.js";
import { env } from "../utils/env.js";

export const auth = betterAuth({
  baseURL: env.URL,
  trustedOrigins: [env.URL],
  database: drizzleAdapter(db, {
    provider: "pg",
    schema
  }),
  advanced: {
    useSecureCookies: false,
  },
  plugins: [ username() ],
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {}
})

export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session;