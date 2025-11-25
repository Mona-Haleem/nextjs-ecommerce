/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_SECRET: string;
    NEXTAUTH_URL: string;

    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;

    FACEBOOK_CLIENT_ID: string;
    FACEBOOK_CLIENT_SECRET: string;

    SERVER_URL: string;

    DATA_KV_REST_API_READ_ONLY_TOKEN: string;
    DATA_KV_REST_API_TOKEN: string;
    DATA_KV_REST_API_URL: string;
    DATA_KV_URL: string;
    DATA_REDIS_URL: string;

    NEXT_PUBLIC_API_URL: string;

    NODE_ENV: "development" | "production" | "test";
  }
}
