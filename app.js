import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => c.text("hello"));

app.get("/arestis", (c) => c.text("Hello re pelle mou"));

export default app;
