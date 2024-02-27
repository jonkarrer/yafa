import { Elysia } from "elysia";
import HomeController from "./controller/TurtleSoupController";
import TurtleSoupController from "./controller/TurtleSoupController";

const Router = new Elysia()
  .onError(({ code, error }) => {
    return new Response(error.toString());
  })
  .get("/", () => Bun.file("public/index.html"))
  .get("/setup/turtle_soup_multi", TurtleSoupController.invoke());

export default Router;
