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
      let user = await AuthController.emailConfirmationAttempt(request, auth);
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
      let user = await AuthController.loginUser(request, auth);
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
      await AuthController.registerUser(request, auth);
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
      async beforeHandle({
        set,
        auth,
        cookie: { access_token, refresh_token },
      }) {
        try {
          let { session } = await AuthController.validateSession(
            access_token.value,
            refresh_token.value,
            auth
          );

          //  Session has been refreshed
          if (session) {
            const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
            set.headers["Set-Cookie"] = [
              `access_token=${session.access_token}; path=/; SameSite=Strict; HttpOnly; max-age=${maxAge}`,
              `refresh_token=${session.refresh_token}; path=/; SameSite=Strict; HttpOnly; max-age=${maxAge}`,
            ];
          }
        } catch (e) {
          let message = "Access denied failed auth";
          console.log(message);
          throw new Unauthorized(message);
        }
      },
    },
    (app) =>
      app
        .get("/", () => {
          return Bun.file("public/index.html");
        })
        .get("/user/account", () => {})
  );

export default Router;
