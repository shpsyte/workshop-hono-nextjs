import { Context, Hono } from "hono";
import { handle } from "hono/vercel";
import GitHub from "@auth/core/providers/github";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import {
  AuthConfig,
  authHandler,
  initAuthConfig,
  verifyAuth,
} from "@hono/auth-js";
import todos from "./todos";
import { db } from "@/db/drizzle";
export const runtime = "edge";

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));
app.use("/auth/*", authHandler());

app.get("/protected", verifyAuth(), (c) => {
  const auth = c.get("authUser");
  return c.json(auth);
});

app.route("/todos", todos);

function getAuthConfig(c: Context): AuthConfig {
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
export const GET = handle(app);
export const POST = handle(app);
