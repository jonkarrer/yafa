import { Context, Elysia } from "elysia";
import TurtleSoupController from "./controller/TurtleSoupController";
import MeanReversionController from "./controller/MeanReversionController";
import AuthController from "./controller/AuthController";
import Database from "./Database";

// Attempt Auth connection
let db = await Database.attemptConnection();

const Router = new Elysia()
  .onError(({ code, error }) => {
    return new Response(error.toString());
  })
  .get("/", () => Bun.file("public/index.html"))
  .get("/auth", () => AuthController.render_ui())
  .decorate("auth", db)
  .post("/auth/login", ({ request, auth }) =>
    AuthController.login_user(request, auth)
  );

export default Router;
