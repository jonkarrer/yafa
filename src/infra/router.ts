import { Elysia, t } from "elysia";
import AuthController from "../app/controller/AuthController";
import Database from "./Database";
import {
  authenticated,
  registered,
  unauthenticated,
} from "../app/case/authenticated";

// Attempt Auth connection
let db = await Database.attemptConnection();

const Router = new Elysia()
  .onError(({ code, error }) => {
    return new Response(error.toString());
  })
  .decorate("auth", db)
  .get("/auth", () => AuthController.render_ui())
  .get("/auth/welcome", () => "<h1>Please Confirm Email</h1>")
  .get("/auth/confirm_email", async ({ request, auth }) => {
    let user = await AuthController.email_confirmation_attempt(request, auth);
    if (user.session) {
      return authenticated(
        user.session.access_token,
        user.session.refresh_token
      );
    } else {
      return unauthenticated("Email confirmation failed");
    }
  })
  .post("/auth/login", async ({ request, auth }) => {
    let user = await AuthController.login_user(request, auth);
    if (user.session) {
      return authenticated(
        user.session.access_token,
        user.session.refresh_token
      );
    } else {
      return unauthenticated("Login failed");
    }
  })
  .post("/auth/register", async ({ request, auth }) => {
    await AuthController.register_user(request, auth);
    return registered("./welcome");
  })
  .guard(
    {
      cookie: t.Object({
        access_token: t.String(),
        refresh_token: t.String(),
      }),
    },
    (app) =>
      app.get("/", () => {
        return Bun.file("public/index.html");
      })
  );

export default Router;
