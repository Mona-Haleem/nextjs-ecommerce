// lib/env.ts
import { z } from "zod";

// Define your environment variable schema
const envSchema = z.object({
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),

  FACEBOOK_CLIENT_ID: z.string(),
  FACEBOOK_CLIENT_SECRET: z.string(),

  SERVER_URL: z.string().url(),

  NEXT_PUBLIC_API_URL: z.string().url(),

  DATA_KV_REST_API_URL: z.string().url(),
  DATA_KV_REST_API_TOKEN: z.string(),
  DATA_KV_REST_API_READ_ONLY_TOKEN: z.string(),
  DATA_KV_URL: z.string(),
  DATA_REDIS_URL: z.string(),
});

// Parse & validate at runtime
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.format());
  throw new Error("Missing or invalid environment variables.");
}

export const env = parsed.data;
