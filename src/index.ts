import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import Router from "./infra/router";

console.log("App Listening on localhost:3300");
new Elysia().use(html()).use(Router).listen(3300);
