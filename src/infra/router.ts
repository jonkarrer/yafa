import { Elysia, t } from "elysia";
import AuthController from "../app/controller/AuthController";
import Database from "./Database";
import { authenticated, registered } from "../app/case/authenticated";
import { Unauthorized } from "../domain/error";

// Attempt Auth connection
let db = await Database.attemptConnection();

const Router = new Elysia()
  .error({
    Unauthorized,
  })
  .onError(({ code, error }) => {
    switch (code) {
      case "Unauthorized":
        return error.sendResponse();
      case "VALIDATION":
        if (error.type === "cookie") {
          return new Unauthorized("Missing auth tokens").sendResponse();
        }
        console.log(error.type);
    }
  })
  .decorate("auth", db)
  .get("/auth", () => AuthController.render_ui())
  .get("/auth/welcome", () => "<h1>Please Confirm Email</h1>")
  .get("/auth/confirm_email", async ({ request, auth }) => {
    try {
      let user = await AuthController.email_confirmation_attempt(request, auth);
      if (user.session) {
        return authenticated(
          user.session.access_token,
          user.session.refresh_token
        );
      } else {
        let message = "Email confirmation missing session";
        console.log(message);
        throw new Unauthorized(message);
      }
    } catch (e) {
      let message = "Email confirmation failed";
      console.log(message, e);
      throw new Unauthorized(message);
    }
  })
  .post("/auth/login", async ({ request, auth }) => {
    try {
      let user = await AuthController.login_user(request, auth);
      if (user.session) {
        return authenticated(
          user.session.access_token,
          user.session.refresh_token
        );
      } else {
        let message = "Login failed missing session";
        console.log(message);
        throw new Unauthorized(message);
      }
    } catch (e) {
      let message = "Login failed";
      console.log(message, e);
      throw new Unauthorized(message);
    }
  })
  .post("/auth/register", async ({ request, auth }) => {
    try {
      await AuthController.register_user(request, auth);
      return registered("./welcome");
    } catch (e) {
      let message = "Registration failed";
      console.log(message, e);
      throw new Unauthorized(message);
    }
  })
  .guard(
    {
      cookie: t.Object(
        {
          access_token: t.String(),
          refresh_token: t.String(),
        },
        {
          error: "Unauthorized",
        }
      ),
    },
    (app) =>
      app.get("/", () => {
        return Bun.file("public/index.html");
      })
  );

export default Router;
