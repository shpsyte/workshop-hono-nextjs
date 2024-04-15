import { db } from "@/db/drizzle";
import GitHub from "@auth/core/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { AuthConfig } from "@hono/auth-js";

export function getAuthConfig(): AuthConfig {
  return {
    adapter: DrizzleAdapter(db),
    secret: process.env.AUTH_SECRET,
    providers: [
      GitHub({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
    ],
  };
}
