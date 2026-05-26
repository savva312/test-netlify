import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("hello"));

const port = Number(process.env.PORT ?? 3000);

console.log(`Hono server running at http://localhost:${port}`);
serve({
  fetch: app.fetch,
  port,
});
