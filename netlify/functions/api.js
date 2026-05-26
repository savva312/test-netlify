import { handle } from "hono/netlify";
import app from "../../app.js";

export const handler = handle(app);
