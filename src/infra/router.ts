import { Elysia } from "elysia";
import TurtleSoupController from "./controller/TurtleSoupController";
import MeanReversionController from "./controller/MeanReversionController";

const Router = new Elysia()
  .onError(({ code, error }) => {
    return new Response(error.toString());
  })
  .get("/", () => Bun.file("public/index.html"))
  .get("/setup/turtle_soup_multi", TurtleSoupController.invoke())
  .get("/setup/mean_reversion_multi", MeanReversionController.invoke());

export default Router;
