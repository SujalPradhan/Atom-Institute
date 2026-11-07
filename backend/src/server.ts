import { serve } from "@hono/node-server";
import { createApp } from "./app.js";
import { createStore } from "./storage.js";

const port = Number(process.env.PORT ?? 8080);
serve({ fetch: createApp(createStore()).fetch, port }, (i) => console.log(`listening on ${i.port}`));
