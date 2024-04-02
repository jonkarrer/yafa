import { Context, Elysia } from "elysia";
import TurtleSoupController from "./controller/TurtleSoupController";
import MeanReversionController from "./controller/MeanReversionController";
import AuthController from "./controller/AuthController";
import Database from "./Database";
import ConfirmEmail from "../web/pages/ConfirmEmail";

// Attempt Auth connection
let db = await Database.attemptConnection();

const Router = new Elysia()
  .onError(({ code, error }) => {
    return new Response(error.toString());
  })
  .decorate("auth", db)
  .get("/", ({ request, auth }) => {
    let check = AuthController.user_is_from_email_confirmation_link(request);
    if (check.success) {
      let headers = new Headers();
      headers.set("Set-Cookie", `auth_token=${check.message}`);
      return new Response(Bun.file("public/index.html"), {
        status: 200,
        statusText: "From Email Link",
        headers: headers,
      });
    } else {
      return Bun.file("public/index.html");
    }
  })
  .get("/auth", () => AuthController.render_ui())
  .get("/auth/confirm_email", ({ request, auth }) => ConfirmEmail())
  .post("/auth/login", ({ request, auth }) =>
    AuthController.login_user(request, auth)
  )
  .post("/auth/register", async ({ request, auth }) => {
    let register_attempt = await AuthController.register_user(request, auth);

    if (register_attempt.success) {
      return Response.redirect("./confirm_email");
    } else {
      return Response.redirect(".");
    }
  });

export default Router;
