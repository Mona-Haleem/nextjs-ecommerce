import { createClient } from "@vercel/kv";
import { env } from "process";

export const kv = createClient({
  url: env.DATA_KV_REST_API_URL!,
  token: env.DATA_KV_REST_API_TOKEN!,
});
