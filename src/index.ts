import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import Router from "./infra/router";
import staticPlugin from "@elysiajs/static";

console.log("App Listening on localhost:3300");
new Elysia().use(staticPlugin()).use(html()).use(Router).listen(3300);
