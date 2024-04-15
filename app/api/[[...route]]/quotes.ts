import { Hono } from "hono";
import { db } from "@/db/drizzle";
import { verifyAuth } from "@hono/auth-js";

const app = new Hono();

app.get("/", verifyAuth(), async (c) => {
  const quotes = await db.query.quotes.findMany({
    orderBy: (quotes, { desc }) => [desc(quotes.createdAt)],
    with: {
      user: true,
    },
  });

  return c.json(quotes);
});

app.post("/", (c) => c.json("create an quotes", 201));
app.get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export default app;
