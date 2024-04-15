import { Hono } from "hono";
import { handle } from "hono/vercel";

import { authHandler, initAuthConfig, verifyAuth } from "@hono/auth-js";
import todos from "./quotes";
import { db } from "@/db/drizzle";
import { getAuthConfig } from "@/app/auht.config";
import quotes from "./quotes";
export const runtime = "edge";

const app = new Hono().basePath("/api");

app.use("*", initAuthConfig(getAuthConfig));
app.use("/auth/*", authHandler());

app.get("/protected", verifyAuth(), (c) => {
  const auth = c.get("authUser");
  return c.json(auth);
});

app.route("/quotes", quotes);

export const GET = handle(app);
export const POST = handle(app);
