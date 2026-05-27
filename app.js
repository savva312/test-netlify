import { Hono } from "hono";

const app = new Hono();

const notes = [
    {
        "id": 1,
        "name": "Note 1",
        "content": "This is the first note"
    },
    {
        "id": 2,
        "name": "Note 2",
        "content": "This is the second note"
    }

]

app.get("/", (c) => c.text("hello"));

app.post("/notes/:id", (c) => c.json(notes));

export default app;

/**
 * GET 
 * POST -> form data
 * PUT
 * DELETE
 */