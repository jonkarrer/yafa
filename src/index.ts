import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import Home from "./Home";

new Elysia()
  .use(html())
  .get("/", ({ query }) => Home(query["companies"]))
  .listen(3000);
